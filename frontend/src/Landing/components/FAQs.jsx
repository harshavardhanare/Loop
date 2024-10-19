"use client"
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import {motion , AnimatePresence} from 'framer-motion';
const items = [
  {
    question: "What features does Loop offer?",
    answer:
      "Loop provides a variety of features, including secure private accounts, robust content moderation, real-time monitoring for safety, and options for users to customize their privacy settings.",
  },
  {
    question: "How do you ensure the security of user accounts?",
    answer:
      "We use advanced technologies such as end-to-end encryption, two-factor authentication, and continuous monitoring to safeguard user accounts and maintain a secure environment.",
  },
  {
    question: "Can I manage my privacy settings on the platform?",
    answer:
      "Yes, Loop allows users to customize their privacy settings, including who can view their profiles and posts, ensuring a tailored social media experience.",
  },
  {
    question: "Is my data safe with Loop?",
    answer:
      "Absolutely! Loop prioritizes data security and employs cutting-edge encryption technologies along with strict access controls to protect your information from unauthorized access.",
  },
];



const AccordinationItem = ({question, answer}) => {
  const[isOpen, setIsOpen] = useState(false);
  return(
   
    <div className=" py-7 cursor-pointer border-b border-white/30" onClick={() => setIsOpen(!isOpen)}>
    <div className="flex items-center ">
      <span className="flex-1 text-lg font-bold">{question}</span>
      {isOpen ? <Minus /> :<Plus />}
      
      </div>
      <AnimatePresence>
      {isOpen && (
        <motion.div 
        initial={{opacity: 0, height: 0, marginTop: 0}}
        animate={{opacity: 1, height: "auto" , marginTop:'16px'}}
        exit={{opacity: 0, height: 0, marginTop: 0}}
          >{answer}</motion.div>

      )}
      </AnimatePresence>
    
  </div>
  
    
  )
}

export const FAQs = () => {
  return (
    <div className="bg-black text-white py-[72px] sm:py-24 bg-gradient-to-b from-[#5D2CA8] to-black ">
      <div className="">
        <h2 className="text-5xl sm:text-6xl sm:w-[648px] mx-auto text-center text-white tracking-tighter">
          Frequently Asked Questions
        </h2>
        <div className="mt-12 max-w-[648px] mx-auto">
         {items.map(({question, answer}) => (
            <AccordinationItem question={question} answer={answer} key={question}/>
         ))}
        </div>
      </div>
    </div>
  )
};
