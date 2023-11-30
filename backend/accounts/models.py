from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from django.utils.functional import cached_property

from comments.models import Comment
from notifications.models import Notification


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    #Avatar
    avatar = models.ImageField(
        upload_to='avatars/', 
        blank=True, 
        null=True,
        default='users/default_avatar'
    )
    @cached_property
    def default_avatar(self):
        if self.user_type == self.SHELTER:
            return 'static/images/default_shelter_avatar.png'
        else:
            return 'static/images/default_seeker_avatar.png'

    def save(self, *args, **kwargs):
        if not self.avatar:
            self.avatar = self.default_avatar
        super(User, self).save(*args, **kwargs)
    
    # User Types
    SHELTER = 'shelter'
    PET_SEEKER = 'pet_seeker'
    USER_TYPE_CHOICES = [
        (SHELTER, 'Shelter'),
        (PET_SEEKER, 'Pet Seeker'),
    ]
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default=PET_SEEKER)
    name = models.CharField(max_length=100, blank=True)
    address = models.CharField(max_length=255, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    description = models.TextField(blank=True)
    objects = CustomUserManager()

    # reverse of generic foreign key
    comments = GenericRelation(Comment)
    notifications = GenericRelation(Notification)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
    
    # methods to determine shelter or seeker
    @property
    def is_shelter(self):
        return self.user_type == self.SHELTER

    @property
    def is_pet_seeker(self):
        return self.user_type == self.PET_SEEKER