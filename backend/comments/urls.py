from django.urls import path
from .views import ShelterCommentListCreateAPIView, ApplicationCommentListCreateAPIView
from .views import SpecificCommentView

app_name = "comments"

urlpatterns = [
    path('shelter/<int:shelter_id>/comments/', ShelterCommentListCreateAPIView.as_view(), name='shelter-comments'),
    path('application/<int:application_id>/comments/', ApplicationCommentListCreateAPIView.as_view(),
         name='application-comments'),
    path('comment/<int:pk>/', SpecificCommentView.as_view(), name='comment'),
]
