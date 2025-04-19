from email.mime.multipart import MIMEMultipart
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr, validator
import smtplib
import os
from email.mime.text import MIMEText
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

# Email configuration
ADMIN_EMAIL = "rifai.moh.fst@uhp.ac.ma"  # Email to send the form submissions to
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USERNAME = os.getenv("SMTP_USERNAME", "rifai.moh.fst@uhp.ac.ma")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "hrll osvs mlwg gzgv")


def build_email_html(fullname: str, prediction: int) -> str:
    if prediction == 1:
        message = f"""
        <p style="font-size: 18px; color: #333;">Thank you, <strong>{fullname}</strong>, for being a committed donor ❤️</p>
        <p style="font-size: 16px; color: #666;">You’re making a real impact. Your next donation can save more lives.</p>
        """
    else:
        message = f"""
        <p style="font-size: 18px; color: #333;">Hi <strong>{fullname}</strong>, your help is needed now more than ever!</p>
        <p style="font-size: 16px; color: #666;">We encourage you to donate blood. You can save up to <strong>3 lives</strong> with a single donation.</p>
        """

    return f"""
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: white; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
          <div style="background-color: #e53935; padding: 20px; color: white; text-align: center;">
            <h1 style="margin: 0;">Save Lives. Donate Blood.</h1>
          </div>
          <div style="padding: 30px; text-align: center;">
            {message}
            <a href="https://www.google.com/maps/search/hospitals+near+me" style="display: inline-block; margin-top: 20px; padding: 12px 25px; background-color: #e53935; color: white; border-radius: 6px; text-decoration: none; font-weight: bold;">Find a Donation Center</a>
          </div>
          <div style="background-color: #f1f1f1; padding: 10px; text-align: center; font-size: 12px; color: #999;">
            Thank you for your compassion ❤️
          </div>
        </div>
      </body>
    </html>
    """

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    city: str
    message: str
    @validator('name')
    def name_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError('Name cannot be empty')
        return v
    
    @validator('city')
    def city_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError('City cannot be empty')
        return v
    
    @validator('message')
    def message_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError('Message cannot be empty')
        return v

class EmailRequest(BaseModel):
    to_email: EmailStr
    fullname: str
    prediction: int  # 1 for will donate, 0 for not donate
    

@router.post("/contact")
async def submit_contact(contact_form: ContactForm):
    """Handle blood donation contact form submission"""
    try:
        # Send email
        email_sent = send_email_contact(contact_form)
        
        if email_sent:
            return JSONResponse(
                status_code=200,
                content={
                    "status": "success",
                    "message": "Thank you for your interest in blood donation! Your message was sent successfully."
                }
            )
        else:
            raise HTTPException(
                status_code=500, 
                detail="Failed to send email. Please try again later."
            )
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred: {str(e)}"
        )

@router.post("/send-email")
def send_email(request: EmailRequest):
    smtp_server = os.getenv("SMTP_SERVER")
    smtp_port = int(os.getenv("SMTP_PORT"))
    email_sender = os.getenv("EMAIL_SENDER")
    email_password = os.getenv("EMAIL_PASSWORD")

    html = build_email_html(request.fullname, request.prediction)

    msg = MIMEText(html, "html")
    msg['Subject'] = "We Appreciate You ❤️"
    msg['From'] = email_sender
    msg['To'] = request.to_email

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(email_sender, email_password)
            server.send_message(msg)
        return {"success": True, "message": "Email sent successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error while sending email: {str(e)}")

def send_email_contact(contact_form: ContactForm):
    try:
        # Create message
        message = MIMEMultipart("alternative")
        message["Subject"] = f"New Blood Donation Inquiry from {contact_form.name}"
        message["From"] = SMTP_USERNAME
        message["To"] = ADMIN_EMAIL
        
        # Email body with blood donation themed colors
        html_content = f"""
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }}
                h2 {{
                    color: #e91e63;
                    border-bottom: 2px solid #e91e63;
                    padding-bottom: 10px;
                }}
                .highlight {{
                    font-weight: bold;
                    color: #e91e63;
                }}
                .info-box {{
                    background-color: #fef5f7;
                    padding: 15px;
                    border-radius: 5px;
                    margin-bottom: 20px;
                }}
                .message-box {{
                    background-color: #fff9fa;
                    padding: 15px;
                    border-left: 5px solid #e91e63;
                    margin-top: 20px;
                }}
                .blood-icon {{
                    color: #e91e63;
                    font-size: 18px;
                    margin-right: 5px;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <h2>❤️ New Blood Donation Contact</h2>
                <div class="info-box">
                    <p>The donor <span class="highlight">{contact_form.name}</span> with email <span class="highlight">{contact_form.email}</span> from <span class="highlight">{contact_form.city}</span> has sent a message:</p>
                </div>
                <div class="message-box">
                    <p>{contact_form.message}</p>
                </div>
                <p style="color: #888; font-size: 12px; margin-top: 20px; text-align: center;">
                    This message was sent through the Blood Donation Contact Form. 
                    <br>Thank you for helping save lives through blood donation.
                </p>
            </div>
        </body>
        </html>
        """
        
        text_content = f"""
        New Blood Donation Contact
        
        The donor {contact_form.name} with email {contact_form.email} from {contact_form.city} has sent a message:
        
        {contact_form.message}
        
        This message was sent through the Blood Donation Contact Form.
        Thank you for helping save lives through blood donation.
        """
        
        # Attach parts
        part1 = MIMEText(text_content, "plain")
        part2 = MIMEText(html_content, "html")
        message.attach(part1)
        message.attach(part2)
        
        # Connect to server and send - with improved error reporting
        try:
            print(f"Connecting to {SMTP_SERVER}:{SMTP_PORT}")
            server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
            print("Starting TLS")
            server.starttls()
            print(f"Logging in with {SMTP_USERNAME}")
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            print("Sending email")
            server.sendmail(SMTP_USERNAME, ADMIN_EMAIL, message.as_string())
            server.quit()
            print("Email sent successfully")
            return True
        except smtplib.SMTPAuthenticationError:
            print("SMTP Authentication Error: Check your username and password")
            return False
        except smtplib.SMTPException as e:
            print(f"SMTP Error: {str(e)}")
            return False
    except Exception as e:
        print(f"General Error: {str(e)}")
        return False