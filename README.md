# Petpal Final Phases

## Table of Contents
<!-- - [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Introduction to Ray](#introduction-to-ray)
- [Installation](#installation)
- [Creating a Ray Cluster](#creating-a-ray-cluster)
- [Running a Task on the Cluster](#running-a-task-on-the-cluster)
- [Stop Ray on the Cluster](#stop-ray-on-the-cluster)
- [Scenarios for use](#scenarios-for-use)
- [Additional Resources](#additional-resources) -->


## Introduction
The project is divided into three phases. In phase 1, you will implement the static version of PetPal as a presentable demo where users can navigate and see the features. However, it is not connected to a backend or frontend server. In phase 2, you will use Django and REST to implement the APIs, and, finally, in phase 3, you finalize the website using React JS. The eventual outcome of this project is a fully-functional website that meets the user stories listed in an upcoming section.


## Description about the project


## Hosting
[Petpal](https://petpal.jimschenchen.com/)

## Features
### Core features
#### Pet Seeker

- **Account Creation**: Users can create accounts with basic information like name, email, and password.
- **Profile Management**: Users can manage their profiles, adding contact information, location, and preferences.
- **Profile Picture**: Option for users to upload a profile picture.
- **Security**: Implementation of secure user authentication and authorization mechanisms.
- **Data Protection**: Ensuring user data protection and privacy.

#### Pet Shelter

- **Account Creation**: Shelters can create accounts, distinct from pet seekers, to list pets for adoption.
- **Shelter Page**: Each shelter has a publicly visible page with contact information, location, mission statement, and a list of pets.
- **Pet Listings**: Shelters can create detailed listings for each pet, including photos, name, breed, age, gender, size, and description.
- **Pet Status Management**: Shelters can update pet status (available, adopted, pending, or withdrawn).
- **Listings Management**: Easy interface for shelters to manage their listings and applications.

#### Search and Filters

- **Search Functionality**: Users can search for pets by location, breed, age, size, color, and gender.
- **Sorting Options**: Ability to sort search results by name, age, and size.
- **Display Format**: Organized and easy-to-browse format for search results.

#### Pet Details

- **Detailed Information**: Clickable listings with detailed information like medical history, behavior, and special needs.

#### Adoption Process

- **Application Form**: Users can express interest in adopting a pet.
- **Review and Response**: Shelters review and respond to adoption requests.
- **Communication**: Users can reply to follow-up questions from shelters.
- **Adoption Decision**: Shelters can accept or deny adoption requests.
- **Guidance**: Information on the adoption process, fees, and requirements.

#### Reviews System

- **User Reviews**: Users can leave reviews and ratings for shelters.
- **Responses**: Both users and shelters can respond to reviews.
- **Identification**: Easy identification of responses from the reviewed shelter and the original poster.

#### Notifications

- **User Notifications**: Alerts for messages, status updates, and new pet listings based on user preferences.
- **Shelter Notifications**: Alerts for new reviews, applications, and messages from applicants.

### Extra features
+ Integration with maps
+ Forget password with sending email
+ Rating summary

## Local Deployment

###  Deployment - Backend (Django Rest Framework)

#### Setup
Instructions to setup sever in Ubuntu 20.04.6

```shell
cd ./backend/
sh startup.sh
source venv/bin/activate
sh run.sh
```

#### API documentation
View API documentation: `127.0.0.1:8000/swagger/`

docs.pdf generated by https://www.swdoc.org



###  Local Deployment - Frontend (React)
```shell
cd ./frontend/
npm install
npm start
```

### Local Deployment - Database & Storage & Email host
Config `backend/.env` with reference to section [Environment Variables](#environment-variables) .

If `backend/.env` does not exist, copy `backend/.env_example` and change name to `backend/.
env`.

Note: Please do not publish `backend/.env` to avoid information leakage.


## Serverless Deployment

### Project Hosting Platform: Vercel
+ Frontend and backend are hosted as two separate projects on Vercel.
+ Go to [Vercel](vercel.com), add new project, select the repo holding your code, `Root Directory` select to `frontend` if you are hosting `frontend` first. Click deploy. Frontend vercel config file are on `backend/vercel.json` and it's already set for you.
+ Create a new project and select `Root Directory` as `backend` to host our `backend`. Select `Framework Preset` as `Create React Project` if you are hosting `backend`.
+ Go to `settings` -> `Environment Variables` and add all the Environment Variables there. Please refer to section [Environment Variables](#environment-variables) .
+ **Note**: Since serverless deployment is stateless, local storage and local database are not allowed. Please setup your own database and your own storage and set Environment Variables properly in section [Environment Variables](#environment-variables).

### Postgresql
We are using [supabase](https://supabase.com/) as our Postgresql. Create an account on [supabase](https://supabase.com/), create an project and copy all the database information to [Environment Variables](#environment-variables).

### Storage
We are using AWS S3 as our storage. You can check this tutorial to create your S3: [tutorial](https://testdriven.io/blog/storing-django-static-and-media-files-on-amazon-s3/). Then add your S3 information to [Environment Variables](#environment-variables).


## Environment Variables

**Database:**
+ `USE_POSTGRESQL = "TRUE"`: Using postgresql, otherwise using local sqlite.
+ If you are using postgresql, following variables must be set: `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`


**Media Storage:**
+ `USE_S3 = "TRUE"`: Using AWS S3 as media storage, otherwise using local folder.
+ If you are using AWS S3, following variables must be set: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_STORAGE_BUCKET_NAME`
+ Note: Static files are always using local storage, you can changing that in `backend/petpal/settings.py`

**Email Host Server:**
+ Email Host are used to send email for resetting passwords.
+ Configuring following variables `EMAIL_HOST_USER` and `EMAIL_HOST_PASSWORD`
+ Setup and get variables from Gmail. tutorial: [tutorial](https://support.google.com/mail/answer/185833?hl=en)



## Screenshots

## Contribution
+ Professor : Jack


## Contact Us



