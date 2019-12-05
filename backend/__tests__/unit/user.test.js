const bcrypt = require("bcryptjs");

const { User } = require("../../src/app/models");

const truncate = require("../utils/truncate");

describe("User", () => {
  beforeEach(async () => {
    await truncate();
  });

  it("Deve criptografar a senha do usuário", async () => {
    const user = await User.create({
      name: "Gustavo",
      email: "clashgustavo1@gmail.com",
      password: "blabla"
    });

    const compareHash = await bcrypt.compare("blabla", user.password_hash);

    expect(compareHash).toBe(true);
  });
});
