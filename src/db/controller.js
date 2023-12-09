
  function generateToken(id) {
    const token = jwt.sign(
      {
        userId: id,
      },
      process.env.SECRET,
      { expiresIn: "7d" }
    );
    return token;
  }

module.exports = {
    generateToken,
}
