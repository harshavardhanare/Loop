"use client"
import HelixImage from '../src/assets/images/helix2.png';
import EmojiImage from '../src/assets/images/emojistar.png';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import {  toast } from 'react-hot-toast';

export const CallToAction = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Form state management
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!formData.email) {
      return toast.warning('Please enter your email');
    }
    if (!formData.message) {
      return toast.warning('Please enter your message');
    }

    // Sending email with EmailJS
    emailjs.send(
      'service_gcljatf', // Replace with your EmailJS service ID
      'template_suoiidp', // Replace with your EmailJS template ID
      {
        email: formData.email,
        message: `Hello Owner,\n\n${formData.message}` // Adds "Hello Ketham" to the start of the message
      },
      'szt_GS68F0QH8ZZgI' // Replace with your EmailJS user ID (public key)
    ).then((result) => {
      if (result.text === "OK") {
        toast.success("Email sent successfully");
        setFormData({ email: '', message: '' }); // Clear form after submission
      } else {
        toast.error("Failed to send email");
      }
    }).catch((error) => {
      toast.error("Failed to send email");
    });
  };

  return (
    <div className="bg-black text-white py-16 sm:py-24 min-h-screen flex items-center justify-center relative overflow-hidden" ref={containerRef}>
      <motion.div style={{translateY}} className="absolute left-[13rem] top-1/2 transform -translate-y-1/2 hidden lg:block">
        <img src={HelixImage} alt="helix" width={200} height={200} />
      </motion.div>
      
      <motion.div style={{translateY}} className="absolute right-[15rem] top-[7rem] transform -translate-y-1/2 hidden lg:block">
        <img src={EmojiImage} alt="emoji" width={200} height={200} />
      </motion.div>
      
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="font-bold text-4xl sm:text-5xl md:text-6xl tracking-tighter text-center">Contact Us</h2>
        <p className="text-lg sm:text-xl text-white/70 mt-5 text-center">Feel free to report any problems<br/>Ask your doubts or queries here..!</p>
        
        <form onSubmit={sendEmail} className="mt-10 flex flex-col gap-4 max-w-lg mx-auto p-6 bg-white/10 rounded-xl shadow-md">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="h-12 bg-white/30 text-white rounded-lg px-5 font-medium placeholder:text-[#9CA3AF] w-full focus:ring-2 focus:ring-violet-500 focus:outline-none transition"
            required
          />
          
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className="h-32 bg-white/30 text-white rounded-lg px-5 py-3 font-medium placeholder:text-[#9CA3AF] w-full resize-none focus:ring-2 focus:ring-violet-500 focus:outline-none transition"
            required
          />

          <button
            type="submit"
            className="bg-violet-600 text-white h-12 rounded-lg px-5 w-full sm:w-auto hover:bg-violet-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
      
    </div>
  );
};