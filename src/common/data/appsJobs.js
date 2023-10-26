

const jobWidgets = [
  {
    id: 1,
    lable: "Application",
    icon: "ri-arrow-up-line ",
    badgeColor: "success",
    chartColor: '["--vz-success" , "--vz-transparent"]',
    number: "16.24 %",
    series: [
      {
        name: "Results",
        data: [0, 110, 95, 75, 120],
      },
    ],
  },
  {
    id: 2,
    lable: "Interviewed",
    icon: "ri-arrow-up-line ",
    badgeColor: "success",
    chartColor: '["--vz-success" , "--vz-transparent"]',
    number: "34.24 %",
    series: [
      {
        name: "Results",
        data: [0, 68, 35, 90, 99],
      },
    ],
  },
  {
    id: 3,
    lable: "Hired",
    icon: "ri-arrow-up-line ",
    badgeColor: "success",
    chartColor: '["--vz-success" , "--vz-transparent"]',
    number: "6.67 %",
    series: [
      {
        name: "Results",
        data: [0, 36, 110, 95, 130],
      },
    ],
  },
  {
    id: 4,
    lable: "Rejected",
    icon: "ri-arrow-down-line ",
    badgeColor: "danger",
    chartColor: '["--vz-danger" , "--vz-transparent"]',
    number: "3.24 %",
    series: [
      {
        name: "Results",
        data: [0, 98, 85, 90, 67],
      },
    ],
  },
];

const jobList = [
  {
    id: 1,
    //  coverImg: img2,
    //  companyLogo: cimg3,
    jobTitle: "UI/UX designer",
    companyName: "Nesta Technologies",
    description:
      "A UI/UX designer's job is to create user-friendly interfaces that enable users to understand how to use complex technical products. If you're passionate about the latest technology trends and devices, you'll find great fulfillment in being involved in the design process for the next hot gadget.",
    tags: ["Design", "Remote", "UI/UX Designer", "Designer"],
    type: "Full Time",
    experience: "2 Year",
    location: "Escondido, California",
    applied: "640 Applied",
    postDate: "11 Sep, 2022",
  },

];

const jobGrid = [
  {
    id: 1,
    //  companyLogo: cimg1,
    jobTitle: "Education Training",
    companyName: "Micro Design",
    location: "Escondido,California",
    postDate: "15 Sep, 2022",
    description:
      "As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data talent.",
    requirement: ["Full Time", "Freelance", " Urgent"],
    status: "Active",
  },
];

const overviewJobs = [
  {
    id: 1,
    //  companyLogo: cimg1,
    jobTitle: "Web designer",
    companyName: "Micro Design",
    location: "Escondido,California",
    time: "3 min ago",
    postDate: "15 Sep, 2022",
    description:
      "As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data talent.",
    requirement: ["Full Time", "Freelance", " Urgent"],
    s1: "Full Time",
    s2: "Freelance",
    s3: "Urgent",
    status: "Active",
  },
];

const jobCandidates = [
  {
    id: 1,
    // userImg: Avatar10,
    candidateName: "Tonya Noble",
    designation: "Web Designer",
    location: "Cullera, Spain",
    type: "Part Time",
    rating: ["4.2", "2.2k Ratings"],
    bookmark: true,
  },
];

const jobCategories = [
  {
    id: 1,
    icon: "https://cdn.lordicon.com/xulniijg.json",
    lable: " Bussiness Development",
    position: "26 Position",
  },

];
const jobApplication = [
  {
    id: 1,
    appid: "#VZ002",
    company: [ "Plunkett Infotech"],
    designation: "Product Designer",
    date: "26 Sep, 2022",
    contacts: "734-544-2407",
    type: "Full Time",
    status: "New",
  },
];
const jobCompanies = [
  {
    id: "1",
    // image_src: cimg3,
    lable: "Martin's Solutions",
    industry_type: "IT Department",
    vacancy: "97",
    company_info:
      "The IT department of a company ensures that the network of computers within the organisation are well-connected and functioning properly. All the other departments within the company rely on them to ensure that their respective functions can go on seamlessly.",
    location: "Cullera, Spain",
    employee: "250-300",
    rating: "4.8",
    website: "www.martinsolution.com",
    email: "info@martinsolution.com",
    since: "1995",
  },
];
export {
  jobWidgets,
  jobList,
  jobGrid,
  overviewJobs,
  jobCandidates,
  jobCategories,
  jobApplication,
  jobCompanies,
};
