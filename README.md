# OVERVIEW



# 🩸 LifelinkAi - Revolutionizing Blood Donation with AI 💉

Welcome to **LifelinkAi** – a cutting-edge software solution that harnesses the power of **Artificial Intelligence** and **modern web technologies** to revolutionize the blood donation experience for both donors and hospitals. Built with **Next.js** for the frontend and **FastAPI** for the backend, LifelinkAi combines **predictive modeling**, **natural language understanding**, and **intelligent interfaces** into one seamless platform. 🚀

---

## 🌟 What is LifelinkAi?

LifelinkAi is an **AI-powered web application** designed to:

- 🗣️ Answer user questions about blood donation through an intelligent **chatbot**.
- 📍 Help users find the **nearest hospitals** for donation, based on their chosen location.
- 🧾 Allow hospitals to **manage donors**, record new entries, and **predict** if a donor is likely to donate again.
- 📊 Enable blood donation centers to **forecast blood stock levels** using predictive analytics.

---

## 🌐 Application URL

You can access the live LifelinkAi application here:

https://blood-donation-rosy-eight.vercel.app/

---

## 🧩 Key Features

### 🤖 AI Chatbot

Ask anything about blood donation! Whether you're wondering _"Does it hurt?"_ or _"How often can I donate?"_, our trained chatbot, powered by a **Machine Learning intent classifier**, has all the answers in real time — with helpful, medically-informed responses. 🧠💬

### 🏥 Hospital Login Portal

Hospitals have a dedicated login system where they can:
- 🔐 Securely log in to their account  
- ➕ Add new donor information  
- 🔍 Predict if a donor will return to donate using an **XGBoost-based predictive model**

### 📈 Predictive Analytics

Using features like **recency**, **frequency**, and **engagement time**, LifelinkAi forecasts the **likelihood of donor return** — helping hospitals estimate upcoming blood supply more effectively than ever. 💡💉📆

### 🌐 Beautiful UI with Next.js

The frontend is smooth, modern, and lightning-fast ⚡, giving both donors and hospitals an intuitive experience:

- 🏠 **Home**: Info about LifelinkAi, blood donation, and how to get in touch  
- 🤖 **Embedded chatbot** for instant answers  
- 🔑 **Login system** for hospitals

---

## 💡 Why LifelinkAi?

- ✅ Enhances **donor engagement** with smart conversational AI  
- ✅ Supports hospitals in **managing and predicting blood stocks**  
- ✅ Empowers communities to **donate safely and confidently**  
- ✅ Bridges the gap between **AI technology and real-world healthcare needs**

---

> 🏆 LifelinkAi isn't just a tool – it's a step toward smarter, data-driven blood donation systems that **save lives**. Let's revolutionize healthcare, one drop at a time. ❤️

# 🚀 Installation Instructions

---

## 1. Clone the Repository
```
git clone https://github.com/ImDeveloperz/bloodDonation.git 
cd bloodDonation
```


## 2. Set Up and Run the Backend (FastAPI)

a. Create a virtual environment and activate it
```
cd backend
python -m venv venv
```

```
venv\Scripts\activate # On Windows

source venv/bin/activate # On macOS/Linux
```

b. Install the dependencies
```
pip install -r requirements.txt
```
c. Run the FastAPI server
```
uvicorn main:app --reload
```

✅ Optional: Run the Backend with Docker
Make sure Docker is installed and running.
```
docker build -t LifelinkAi-backend .
docker run -p 8000:8000 LifelinkAi-backend
```

## 3. Set Up and Run the Frontend (Next.js)
```
cd frontend
npm install
npm run dev
```

# 📘 Usage Guide

---

## 🏠 Home Page Navigation
The landing page consists of five key sections:

- Home – Introduction and overview.
- Services – Highlights LifelinkAi’s capabilities.
- Testimonials – Real user stories and feedback.
- How it Works – Quick walkthrough of the system.
- Contact – Get in touch with the team.

## 🩸 Chatbot Access
At the bottom-right of the screen, you'll see a blood drop icon. Click it to open the AI-powered chatbot and ask questions like:

- “How to donate?”
- “Blood centers in my city?”

Get real-time, accurate, and helpful responses powered by our custom-trained AI model.

## 🔐 Hospital Portal Access

Hospitals can securely log in by clicking the Login button at the top-right of the navigation bar.
Use the following test credentials:

- Email: xyz@gmail.com  
- Password: abc123

Once logged in, hospitals can:

🧾 View Donor List: See all recorded donor information.

🧠 Predict Donor Return: Click the Predict button to see which donors are likely to return and which are not.

📬 Notify Donors:
- Likely to Return: Send encouragement and reminders.
- Not Likely to Return: Send awareness messages to re-engage them.

## ➕ Donor Management
Hospitals can also:

**Add a New Donor** – Quickly register a new donor to the database.

**Add a Donation** – Log a donation event for an already recorded donor.

This ensures records are kept up-to-date and insights remain accurate for future predictions.

# 👥 Contributor Credits

---

This project was developed by a passionate team of innovators. We thank everyone who contributed to making LifelinkAi a success:

- Yahya ERRAME – AI & Backend Developer
- Mohamed RIFAI – AI & Backend Developer
- Zakariae ZEMAT - Frontend developer
- Zouhair TOUFANI - FullStack developer

🙏 Special thanks to GDSC EMSI for organizing the OpportunAI Hackathon, which inspired and empowered the creation of this solution.


