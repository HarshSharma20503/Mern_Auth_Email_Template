# Mern Template

## Description

This is a project with a linux shell script which if you run will download a template of mern stack application to your desktop with all the dependencies installed and you can smoothly get a connected frontend and backend application.

## Libraries you will get

### Frontend

-   axios
-   bootstrap
-   react
-   react-bootstrap
-   react-dom
-   react-toastify
-   prettier (Dev Dependencies)

### backend

-   bcrypt
-   cookie-parser
-   cors
-   dotenv
-   express
-   jsonwebtoken
-   mongoose
-   nodemailer
-   nodemon (Dev Dependencies)
-   prettier (Dev Dependencies)

## Steps to follow
1. Download the ./mern_template script and then give it execution permission by `sudo chmod +x mern_template.sh`
1. Run the script named mern_template by following command `./mern_template.sh project_name`
2. This will clone and install all the dependenices of the project and open vs code.
3. Uncomment the .env from the .gitignore
4. Now fill the .env of the backend with `EMAIL_ID` and `APP_PASSWORD` that will be used to sent mail of confirmation after signup.
5. Use the email which has 2 step verification on.
6. Go to the account settings of that chosen mail and search for app password, create or generate a app password and paste it here.
7. Create a mongodb atlas project with proper ip access (use open for all access for development) and get the URI and than append the database name too. e.g.
   `mongodb+srv://<Your Username>:<Your Password>@cluster0.<Project Id>.mongodb.net/<Database Name>` like `mongodb+srv://harshsh0503:harshsharm3@cluster0.9vsdfans.mongodb.net/Red_Alert`
9. Simply run the project by npm run dev in both frontend and backend.
10. Change the title of the project inside the frontend from navbar and index.html.

## Contributions

Any form of contribution is welcomed and deeply valued.
