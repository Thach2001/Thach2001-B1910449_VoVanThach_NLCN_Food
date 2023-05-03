const ContactModel = require("../Models/ContactModel");

const getListContact = async (req, res) => {
   try {
      const contacts = await ContactModel.find(); // find(): tra ve tat ca cac thong tin tim thay
      return res.status(200).send(contacts);
   } catch (error) {
      console.log(error);
   }
};

const postContact = (req, res) => {
   try {
      const { fullname, email, feedback } = req.body;
      ContactModel.create({
         fullname: fullname,
         email: email,
         feedback: feedback,
      });
      return res.status(200).send("Create contact success");
   } catch (error) {
      console.log(error);
   }
};

module.exports = {
   getListContact: getListContact,
   postContact: postContact,
};
