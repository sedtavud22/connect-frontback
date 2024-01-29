const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const hashedPassword = bcrypt.hashSync("123456", 10);

const teacherData = [
  {
    firstname: "Andy",
    tCode: "t001",
    password: hashedPassword,
    email: "andy@gmail.com",
  },
  {
    firstname: "Rigby",
    tCode: "t002",
    password: hashedPassword,
    email: "rigby@gmail.com",
  },
  {
    firstname: "Poby",
    tCode: "t003",
    password: hashedPassword,
    email: "poby@gmail.com",
  },
  {
    firstname: "Danny",
    tCode: "t004",
    password: hashedPassword,
    email: "danny@gmail.com",
  },
];

const subjectData = [
  { title: "HTML", description: "Write web page" },
  { title: "CSS", description: "Style web page" },
  { title: "JS", description: "Dynamic web page" },
];

const run = async () => {
  await prisma.teacher.createMany({ data: teacherData });
  await prisma.subject.createMany({ data: subjectData });
};

run();
