from paho.mqtt import client as mq_client
import json
import os
import django
import time
import ssl
# Configure Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'vendsoft.settings')
django.setup()


from tenant.models import Tenant
# MQTT Broker configuration

BROKER = '65.109.139.161'
PORT = 1883
TOPIC_M_STATUS = 'EMBI/M_Status'
TOPIC_M_ORDER = 'EMBI/M_Order'


# Add MQTT username and password
MQTT_USERNAME = 'lldnoeHIULHU87678'
MQTT_PASSWORD = 'oSBVFIELH8734109283Vkjvbk'

from django.db import connection
from django.utils import timezone



from tenant.models import Tenant
import logging

LOG_FILE = 'log/app.log'
logging.basicConfig(filename=LOG_FILE, level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


def connect_mqtt(broker, port):
    def on_connect(client, userdata, flags, rc):
        if rc == 0:
            logger.info('Successfully connected to MQTT broker')
        else:
            logger.error(f'Failed to connect, return code {rc}')
            logger.info('Attempting to reconnect...')
            client.reconnect()

    

    client = mq_client.Client()
    client.on_connect = on_connect
    
    # Set username and password
    client.username_pw_set(MQTT_USERNAME, MQTT_PASSWORD)

    try:
        client.connect(broker, port)
    except Exception as e:
        logger.error(f'Failed to connect to MQTT broker: {e}')
        logger.info('Attempting to reconnect...')
        client.reconnect()

    return client


def subscribe(client):
    def on_message(client, userdata, msg):
        payload = msg.payload.decode()
        topic = msg.topic
        try:
            data = json.loads(payload)
            # logger.info(f'Received message on topic {topic}: {data}')
            print(data)
           
            for tenant in Tenant.objects.all():
                logger.info(f'Current Tenant: {tenant}')
                with connection.cursor() as cursor:
                    # Insert data into userapp_mqttdata table
                    cursor.execute(
                        """
                        INSERT INTO {schema}.userapp_mqttdata (topic, payload, timestamp, created_at, m_id, capacity, stock, status, mode) 
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                        """.format(schema=tenant.schema_name),
                        [topic, payload, timezone.now(), timezone.now(), data.get('M_Id'), data.get('Capacity'), data.get('Stock'), data.get('Status'), data.get('Mode')]
                    )
                    logger.info(f"Data for machine {data.get('M_Id')} inserted into userapp_mqttdata for {tenant.schema_name} tenant.")

                    # Check if the machine exists in machinedataapp_machinemaster table
                    cursor.execute(
                        """
                        SELECT * FROM {schema}.machinedataapp_machinemaster WHERE machine_id = %s
                        """.format(schema=tenant.schema_name),
                        [data.get('M_Id')]
                    )
                    machine_exists = cursor.fetchone() is not None
                    logger.info(f'machine exists: {machine_exists}')

                    if machine_exists:
                        # Fetch the last entry for the specific machine (m_id)
                        cursor.execute(
                            """
                            SELECT * FROM {schema}.userapp_mstatus 
                            WHERE m_id = %s 
                            ORDER BY id DESC 
                            LIMIT 1
                            """.format(schema=tenant.schema_name),
                            [data.get('M_Id')]
                        )
                        last_entry = cursor.fetchone()

                        if last_entry:
                            # Compare the fetched data with the incoming data
                            logger.info(f'last entry: {last_entry[3]}')
                            if (last_entry[3] == data.get('Stock') and last_entry[4]):
                                logger.info(f"Data for machine {data.get('M_Id')} is the same")

                            else:
                                # Insert new data into userapp_mstatus table
                                cursor.execute(
                                    """
                                    INSERT INTO {schema}.userapp_mstatus (m_id, capacity, stock, status, mode, created_at) 
                                    VALUES (%s, %s, %s, %s, %s, %s)
                                    """.format(schema=tenant.schema_name),
                                    [data.get('M_Id'), data.get('Capacity'), data.get('Stock'), data.get('Status'), data.get('Mode'), timezone.now()]
                                )
                                logger.info(f"Data for machine {data.get('M_Id')} saved successfully for {tenant.schema_name} tenant in userapp_mstatus.")
                        else:
                            # Insert new data into userapp_mstatus table
                            cursor.execute(
                                """
                                INSERT INTO {schema}.userapp_mstatus (m_id, capacity, stock, status, mode, created_at) 
                                VALUES (%s, %s, %s, %s, %s, %s)
                                """.format(schema=tenant.schema_name),
                                [data.get('M_Id'), data.get('Capacity'), data.get('Stock'), data.get('Status'), data.get('Mode'), timezone.now()]
                            )
                            logger.info(f"Data for machine {data.get('M_Id')} saved successfully for {tenant.schema_name} tenant in userapp_mstatus.")
                    
                    else:
                        logger.warning(f"M_Id {data.get('M_Id')} does not exist in machinedataapp_machinemaster for {tenant.schema_name} tenant.")
                    
                    if topic == TOPIC_M_ORDER:
                        # Insert data into MOrder table using cursor
                        cursor.execute(
                            """
                            INSERT INTO {schema}.userapp_morder (machine_id, aid, tid, rid, qty) 
                            VALUES (%s, %s, %s, %s, %s)
                            """.format(schema=tenant.schema_name),
                            [data.get('MACHINE_ID'), data.get('AID'), data.get('TID'), data.get('RID'), data.get('QTY')]
                        )
                        logger.info(f"Data for machine {data.get('MACHINE_ID')} saved successfully for {tenant.schema_name} tenant in m_order.")

        except Exception as e:
            logger.error(f"Error processing message for {tenant.schema_name} tenant: {e}")

    client.subscribe(TOPIC_M_STATUS)
    client.subscribe(TOPIC_M_ORDER)
    client.on_message = on_message

# def main():
#     client = connect_mqtt(BROKER, PORT)
#     client.loop_start()
#     subscribe(client)

#     try:
#         while True:
#             time.sleep(1)
#     except KeyboardInterrupt:
#         pass
#     finally:
#         client.loop_stop()
#         client.disconnect()

# if __name__ == '__main__':
#     main()
import threading

def main():
    client = connect_mqtt(BROKER, PORT)
    if client is None:
        logger.error("MQTT client is None. Exiting...")
        return

    client.loop_start()  # Start the MQTT client loop in a background thread
    subscribe(client)

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        pass
    finally:
        client.loop_stop()  # Stop the MQTT client loop
        client.disconnect()

if __name__ == '__main__':
    main()