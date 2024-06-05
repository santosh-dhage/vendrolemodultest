import qrcode

# UPI payment link
upi_link = ("upi://pay?mode=02&pa=EQR2405141717272890140702@ybl&"
            "purpose=00&mc=5046&am=10.00&pn=PhonePeMerchant&"
            "orgid=180001&sign=MEQCIHuN7x+YsBU5z9qxVlsyRvX87UCisBJL9Zp6ixynTyiMAiAyNXQL1Lb/kgXTBUAMguBNxjZx9QAP2A3HZ8PjrbhRw==")

# Create QR code
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)
qr.add_data(upi_link)
qr.make(fit=True)

# Generate the image
img = qr.make_image(fill='black', back_color='white')

# Save the image
img.save("upi_qr_code.png")

print("QR code generated and saved as upi_qr_code.png")