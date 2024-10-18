import Message from "../models/message.model.js";

export const getChatHistory = async (req, res) => {
  const { recipientId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, recipient: recipientId },
        { sender: recipientId, recipient: req.user._id },
      ],
    }).sort({ timestamp: 1 });
    console.log( messages,req.user._id,recipientId,'gte');

    res.json(messages);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const sendMessage = async (req, res) => {
  const { recipientId, content } = req.body;
  console.log(recipientId,"send message");

  try {
    const message = new Message({
      sender: req.user._id,
      recipient: recipientId,
      content,
    });

    await message.save();
    res.json(message);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Server error" });
  }
};
