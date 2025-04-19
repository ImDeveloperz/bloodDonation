"use client"
import { useRef } from "react";
import emailjs from "emailjs-com";

export default function Contact() {
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);

    const data = {
      name: formData.get("user_name"),
      email: formData.get("user_email"),
      city: formData.get("user_city"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("http://localhost:8000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        form.current.reset();
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.detail || "Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <section id="contact" className="px-6 md:px-20 py-16 bg-white">
      <div className="flex justify-start mb-4">
        <h2 className="bg-[#FF5B5B] text-black text-lg font-semibold px-4 py-1 rounded-md">
          Contact Us
        </h2>
      </div>
      <p className="text-black text-base font-medium mb-8">
        Connect with Us: Let’s Discuss<br />
        Your Digital Marketing Needs
      </p>

      <div className="bg-[#f3f3f3] rounded-3xl p-8 md:flex md:items-start md:justify-between">
        <form ref={form} onSubmit={sendEmail} className="flex-1 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Name*</label>
            <input
              type="text"
              name="user_name"
              placeholder="Name"
              className="w-full p-3 rounded-md border border-black outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email*</label>
            <input
              type="email"
              name="user_email"
              placeholder="Email"
              className="w-full p-3 rounded-md border border-black outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">City*</label>
            <select
              name="user_city"
              className="w-full p-3 rounded-md border border-black outline-none"
              required
            >
              <option value="">Select a city</option>
              <option value="Casablanca">Casablanca</option>
              <option value="Rabat">Rabat</option>
              <option value="Marrakech">Marrakech</option>
              <option value="Fes">Fes</option>
              <option value="Tangier">Tangier</option>
              <option value="Agadir">Agadir</option>
              <option value="Oujda">Oujda</option>
              <option value="Meknes">Meknes</option>
              <option value="Tetouan">Tetouan</option>
              <option value="Laayoune">Laayoune</option>
              {/* Add more cities if needed */}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message*</label>
            <textarea
              name="message"
              placeholder="Message"
              rows="5"
              className="w-full p-3 rounded-md border border-black outline-none resize-none"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#1a1a22] text-white py-3 rounded-md text-base font-medium hover:opacity-90"
          >
            Send Message
          </button>
        </form>
        <div className="hidden md:block flex-1 text-right">
          <img
            src="/contact.png"
            alt="Contact graphic"
            className="w-96 inline-block"
          />
        </div>
      </div>
    </section>
  );
}