import feedbackModel from "../models/FeedbackModel.js";

export const readVars = async (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  console.log('hey');
  
  
  let response = "";
  const input = text.split("*");

  if (text === "") {
    response = `CON Report road condition
        1. Report an accident
        2. Report bad road
        3. Report traffic
        4. General feedback`;
  } else if (text === "1") {
    response = `CON Provide details of the accident:
        1. Minor accident
        2. Major accident`;
  } else if (text === "1*1" || text === "1*2") {
    const details = input[1] === "1" ? "Minor accident" : "Major accident";
    response = `END Thank you for reporting the accident. Your feedback helps others stay safe.`;

    const feedback = await feedbackModel.create({
      phoneNumber,
      feedbackType: "Accident",
      details
    });

  } else if (text === "2") {
    response = `CON Provide more details about the bad road:
        1. Potholes
        2. Flooded road
        3. Completely blocked`;
  } else if (text === "2*1" || text === "2*2" || text === "2*3") {
    const badRoadDetails = ["Potholes", "Flooded road", "Completely blocked"];
    const details = badRoadDetails[parseInt(input[1]) - 1];
    response = `END Thank you for reporting the road condition. Your feedback helps improve road safety.`;

    const feedback = await feedbackModel.create({
      phoneNumber,
      feedbackType: "Bad Road",
      details
    });

  } else if (text === "3") {
    response = `CON Provide details about the traffic:
        1. Light traffic
        2. Heavy traffic
        3. Road closed`;
  } else if (text === "3*1" || text === "3*2" || text === "3*3") {
    const trafficDetails = ["Light traffic", "Heavy traffic", "Road closed"];
    const details = trafficDetails[parseInt(input[1]) - 1];
    response = `END Thank you for reporting traffic updates. Your feedback has been recorded.`;

    const feedback = await feedbackModel.create({
      phoneNumber,
      feedbackType: "Traffic",
      details
    });

  } else if (text === "4") {
    response = `CON Enter your feedback below (max 160 characters):`;
  } else if (input[0] === "4" && input.length > 1) {
    const feedbackText = input.slice(1).join(" ");
    response = `END Thank you for your feedback: "${feedbackText}". Your input helps improve safety for all.`;

    const feedback = await feedbackModel.create({
      phoneNumber,
      feedbackType: "General Feedback",
      details: feedbackText
    });

  } else {
    response = `END Invalid input. Please try again.`;
  }

  res.set("Content-Type", "text/plain");
  res.send(response);
};
