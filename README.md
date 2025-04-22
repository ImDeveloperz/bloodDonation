# OVERVIEW



# 🩸 Lifelink - Revolutionizing Blood Donation with AI 💉

Welcome to **Lifelink** – a cutting-edge software solution that harnesses the power of **Artificial Intelligence** and **modern web technologies** to revolutionize the blood donation experience for both donors and hospitals. Built with **Next.js** for the frontend and **FastAPI** for the backend, Lifelink combines **predictive modeling**, **natural language understanding**, and **intelligent interfaces** into one seamless platform. 🚀

---

## 🌟 What is Lifelink?

Lifelink is an **AI-powered web application** designed to:

- 🗣️ Answer user questions about blood donation through an intelligent **chatbot**.
- 📍 Help users find the **nearest hospitals** for donation, based on their chosen location.
- 🧾 Allow hospitals to **manage donors**, record new entries, and **predict** if a donor is likely to donate again.
- 📊 Enable blood donation centers to **forecast blood stock levels** using predictive analytics.

---

## 🧩 Key Features

### 🤖 AI Chatbot

Ask anything about blood donation! Whether you're wondering _"Does it hurt?"_ or _"How often can I donate?"_, our trained chatbot, powered by a **Machine Learning intent classifier**, has all the answers in real time — with helpful, medically-informed responses. 🧠💬

### 🏥 Hospital Login Portal

Hospitals have a dedicated login system where they can:
- 🔐 Securely log in to their account  
- ➕ Add new donor information  
- 🔍 Predict if a donor will return to donate on a given date using an **XGBoost-based predictive model**

### 📈 Predictive Analytics

Using features like **recency**, **frequency**, and **engagement time**, Lifelink forecasts the **likelihood of donor return** — helping hospitals estimate upcoming blood supply more effectively than ever. 💡💉📆

### 🌐 Beautiful UI with Next.js

The frontend is smooth, modern, and lightning-fast ⚡, giving both donors and hospitals an intuitive experience:

- 🏠 **Home**: Info about Lifelink, blood donation, and how to get in touch  
- 🤖 **Embedded chatbot** for instant answers  
- 🔑 **Login system** for hospitals

---

## 💡 Why Lifelink?

- ✅ Enhances **donor engagement** with smart conversational AI  
- ✅ Supports hospitals in **managing and predicting blood stocks**  
- ✅ Empowers communities to **donate safely and confidently**  
- ✅ Bridges the gap between **AI technology and real-world healthcare needs**

---

> 🏆 Lifelink isn't just a tool – it's a step toward smarter, data-driven blood donation systems that **save lives**. Let's revolutionize healthcare, one drop at a time. ❤️

# 🚀 Installation Instructions

---

## 1. Clone the Repository

- git clone https://github.com/your-username/neuralink.git
- cd neuralink

## 2. Set Up and Run the Backend (FastAPI)

a. Create a virtual environment and activate it
- cd backend
- python -m venv venv

On Windows
- venv\Scripts\activate

On macOS/Linux
- source venv/bin/activate

b. Install the dependencies
- pip install -r requirements.txt

c. Run the FastAPI server
- uvicorn main:app --reload

✅ Optional: Run the Backend with Docker
Make sure Docker is installed and running.

- docker build -t neuralink-backend .
- docker run -p 8000:8000 neuralink-backend

## 3. Set Up and Run the Frontend (Next.js)

- cd frontend
- npm install
- npm run dev


# Usage Guide

---


