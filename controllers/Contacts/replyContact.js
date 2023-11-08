import { Contact } from "../../models";
import { receiveContactEmail } from "../../middleware";
import { replyContact } from "../../models/replyModel";
import { catchAsyncError } from "../../utility";
import errorHandler from "../../utility/errorHandlerClass";

export const replyContacted = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const contact = await Contact.findById({ _id: id });

  if (!contact) {
    return next(
      new errorHandler(`A contact with this id: ${id} not found`, 404)
    );
  }

  req.body.contactID = id;
  req.body.replyEmail = req.userEmail;
  const emailRepliedTo = contact.email;

  contact.replyMessage = req.body;
  contact.repliedDate = new Date();

  await contact.save();

  if (!req.body.replyMessage || req.body.replyMessage == "") {
    return next(new errorHandler(`can't send an empty reply`, 404));
  }

  let repliedData = await replyContact.create(req.body);

  // receiveContactEmail(contact.email, contact.names);

  res.status(201).json({
    message: "Your reply sent successfully",
    data: { repliedData },
  });
});
