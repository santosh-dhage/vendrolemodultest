# from django.shortcuts import render
# from rest_framework import viewsets
# from .models import *
# from .serializers import *
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.validators import ValidationError
# # Create your views here.


# @api_view(['POST'])
# def upload_logo(request):
#     if request.method == 'POST':
#         serializer = LogoUploadSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(user=request.user)  # Assuming you're using authentication
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # path('api/upload_logo/', upload_logo, name='upload_logo'),


        
# class ModelNumberViewSet(viewsets.ModelViewSet):
#     queryset = ModelNumber.objects.all()
#     serializer_class = ModelNumberSerializer
#     # permission_classes=[IsAuthenticated]

#     def list(self, request, *args, **kwargs):
#         try:
#             queryset = ModelNumber.objects.all().order_by('-id')
#             serializer = ModelNumberSerializer(queryset, many=True)
#             return Response({'success': 1, 'message': 'Data Found', 'result': serializer.data})
#         except Exception as e:
#             return Response({'success': 0, 'message': 'Not Found', 'result': str(e)})

#     def retrieve(self, request, pk, *args, **kwargs):
#         try:
#             chp = ModelNumber.objects.get(pk=pk)
#             serializer = ModelNumberSerializer(chp)
#             return Response({'success': 1, 'message': 'Data Found', 'result': serializer.data})
#         except ModelNumber.DoesNotExist:
#             return Response({'success': 0, 'message': 'Not Found'})

#     def create(self, request, *args, **kwargs):
#         # try:
#             serializer = ModelNumberSerializer(data=request.data)
#             serializer.is_valid(raise_exception=True)
#             serializer.save()
#             return Response({'success': 1, 'message': 'Data Created', 'result': serializer.data})
#         # except ValidationError as ve:
#         #     return Response({'success': 0, 'message': 'Not Created', 'result': ve.detail})

#     def update(self, request, pk, *args, **kwargs):
#         try:
#             chp = ModelNumber.objects.get(pk=pk)
#             serializer = ModelNumberSerializer(chp, data=request.data)
#             serializer.is_valid(raise_exception=True)
#             serializer.save()
#             return Response({'success': 1, 'message': 'Data Updated', 'result': serializer.data})
#         except ModelNumber.DoesNotExist:
#             return Response({'success': 0, 'message': 'Not Found'})

#     def destroy(self, request, pk, *args, **kwargs):
#         try:
#             chp = ModelNumber.objects.get(pk=pk)
#             chp.delete()
#             return Response({'success': 1, 'message': 'Data Deleted'})
#         except ModelNumber.DoesNotExist:
#             return Response({'success': 0, 'message': 'Not Found'})
        

# class CapacityViewSet(viewsets.ModelViewSet):
#     queryset = Capacity.objects.all()
#     serializer_class = CapacitySerializer
#     # permission_classes=[IsAuthenticated]

#     def list(self, request, *args, **kwargs):
#         try:
#             queryset = Capacity.objects.all().order_by('-id')
#             serializer = CapacitySerializer(queryset, many=True)
#             return Response({'success': 1, 'message': 'Data Found', 'result': serializer.data})
#         except Exception as e:
#             return Response({'success': 0, 'message': 'Not Found', 'result': str(e)})

#     def retrieve(self, request, pk, *args, **kwargs):
#         try:
#             chp = Capacity.objects.get(pk=pk)
#             serializer = CapacitySerializer(chp)
#             return Response({'success': 1, 'message': 'Data Found', 'result': serializer.data})
#         except Capacity.DoesNotExist:
#             return Response({'success': 0, 'message': 'Not Found'})

#     def create(self, request, *args, **kwargs):
#         try:
#             serializer = CapacitySerializer(data=request.data)
#             serializer.is_valid(raise_exception=True)
#             serializer.save()
#             return Response({'success': 1, 'message': 'Data Created', 'result': serializer.data})
#         except ValidationError as ve:
#             return Response({'success': 0, 'message': 'Not Created', 'result': ve.detail})

#     def update(self, request, pk, *args, **kwargs):
#         try:
#             chp = Capacity.objects.get(pk=pk)
#             serializer = CapacitySerializer(chp, data=request.data)
#             serializer.is_valid(raise_exception=True)
#             serializer.save()
#             return Response({'success': 1, 'message': 'Data Updated', 'result': serializer.data})
#         except Capacity.DoesNotExist:
#             return Response({'success': 0, 'message': 'Not Found'})

#     def destroy(self, request, pk, *args, **kwargs):
#         try:
#             chp = Capacity.objects.get(pk=pk)
#             chp.delete()
#             return Response({'success': 1, 'message': 'Data Deleted'})
#         except Capacity.DoesNotExist:
#             return Response({'success': 0, 'message': 'Not Found'})