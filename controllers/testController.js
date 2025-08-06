const testController = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      msg: "test api is working!",
    });
  } catch (err) {
    console.log("error - ", err.message);
  }
};

export { testController };
