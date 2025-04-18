// scripts/seedStudents.js
const mongoose = require('mongoose');
const Student = require('../models/Student');

mongoose.connect('mongodb://localhost:27017/entrepreneurDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected for seeding"))
.catch(err => {
  console.log("Database connection error:", err);
  process.exit(1);
});

// Complete student data from all images
const studentData = [
  { slNo: 1, name: 'AAKANKSHA CHALLAWAR', htNo: '2007IA0501', linkedinUrl: 'https://www.linkedin.com/in/aakanksha-challawar-941682205/', role: 'NA' },
  { slNo: 2, name: 'AEKKA SATHVIK', htNo: '2007IA0502', linkedinUrl: 'https://www.linkedin.com/in/sathvik-aekka-99668b1b9/', role: 'ACCENTURE-PACKAGED APP DEVELOPER ASSOCIATE' },
  { slNo: 3, name: 'ALAMPALLY ANURADHA', htNo: '2007IA0503', linkedinUrl: 'https://www.linkedin.com/in/anuradha-alampally-071124234/', role: 'Cloud Platform Integrations (CPI) - Entry Level-STRADA' },
  { slNo: 4, name: 'ALAPATI SHYAM SATYA CHOWDARY', htNo: '2007IA0504', linkedinUrl: null, role: null },
  { slNo: 5, name: 'ANURAAG CHILAKAMARRI', htNo: '2007IA0505', linkedinUrl: 'https://www.linkedin.com/in/anuraag-chilakamarri-589482214/', role: 'ANALYST-DELOITTE' },
  { slNo: 6, name: 'ARRA POOJITHA', htNo: '2007IA0506', linkedinUrl: null, role: null },
  { slNo: 7, name: 'BEGARI ADITHI', htNo: '2007IA0507', linkedinUrl: null, role: null },
  { slNo: 8, name: 'BELIGINI SHIVA TEJA', htNo: '2007IA0508', linkedinUrl: null, role: null },
  { slNo: 9, name: 'BENDUKURI RISHAB', htNo: '2007IA0509', linkedinUrl: 'https://www.linkedin.com/in/rishab-bendukuri-2860a3207/', role: 'SOFTWARE ENGINEER-JPMC' },
  { slNo: 10, name: 'BHAKTI SHASHIKANTH JADHAV', htNo: '2007IA0510', linkedinUrl: null, role: null },
  { slNo: 11, name: 'BONDADA PUJA', htNo: '2007IA0511', linkedinUrl: 'https://www.linkedin.com/in/puja-bondada-1bb78622a/', role: 'Technical Consultant at Oracle' },
  { slNo: 12, name: 'BUSIREDDY SAI ROHAN REDDY', htNo: '2007IA0512', linkedinUrl: null, role: null },
  { slNo: 13, name: 'CHANDRA DYEP GURUJALA', htNo: '2007IA0513', linkedinUrl: 'https://www.linkedin.com/in/chandra-dyep-gurujala-970763233/', role: 'Software Engineer at Zenoti' },
  { slNo: 14, name: 'CHINTALA POOJASRI', htNo: '2007IA0514', linkedinUrl: null, role: null },
  { slNo: 15, name: 'DARAM ROHITH', htNo: '2007IA0515', linkedinUrl: 'https://www.linkedin.com/in/daram-rohith-562233233/', role: 'NA' },
  { slNo: 16, name: 'DONTHOJEE BHARATHI KRISHNA', htNo: '2007IA0516', linkedinUrl: 'https://www.linkedin.com/in/bharathi-krishna-donthojee-35a487225/', role: 'System Engineer at TCS-LSEG' },
  { slNo: 17, name: 'GANDYADAPU ADARSHA', htNo: '2007IA0517', linkedinUrl: 'https://www.linkedin.com/in/adarsha-gandyadapu-63580b213/', role: 'NA' },
  { slNo: 18, name: 'GANGISHETTY MANIDEEP', htNo: '2007IA0518', linkedinUrl: 'https://www.linkedin.com/in/manideep-gangishetty-5b9216205/  ', role: 'Associate, TechOps at The D. E. ShawGroup' },
  { slNo: 19, name: 'GANJU MEGHANA', htNo: '2007IA0519', linkedinUrl: 'https://www.linkedin.com/in/meghana-ganji-728161202/', role: 'NA' },
  { slNo: 20, name: 'GOLLA SHRIYA', htNo: '2007IA0520', linkedinUrl: 'https://www.linkedin.com/in/shriya-golla-292545237/', role: 'Working as a Packaged App Development Associate at Accenture' },
  { slNo: 21, name: 'GUMMADI MAHESH GANDHI', htNo: '2007IA0521', linkedinUrl: 'https://www.linkedin.com/in/mahesh-gandhi-gummadi-b13285228/', role: null },
  { slNo: 22, name: 'GURRAM ANUSHA', htNo: '2007IA0522', linkedinUrl: 'https://www.linkedin.com/in/anusha-gurram-970b2a223/', role: 'MS' },
  { slNo: 23, name: 'GYARA ANVESH', htNo: '2007IA0523', linkedinUrl: 'https://www.linkedin.com/in/anvesh-gyara-5115b8265/', role: 'NA' },
  { slNo: 24, name: 'HARSHITH CHEJERLA', htNo: '2007IA0524', linkedinUrl: 'https://www.linkedin.com/in/harshith-chejerla/', role: 'Data Science Grad Student @ University of Maryland, College Park' },
  { slNo: 25, name: 'JIGEESH CHOWDHARY NALLAPATI', htNo: '2007IA0525', linkedinUrl: 'https://www.linkedin.com/in/jigeesh-chowdhary-nallapati-0aa05113a/', role: 'NA' },
  { slNo: 26, name: 'JISHNU PULIPAKA', htNo: '2007IA0526', linkedinUrl: 'https://www.linkedin.com/in/jishnu-pulipaka-974b26244/', role: 'Software Engineer at JP Morgan Chase and Co' },
  { slNo: 27, name: 'JUPUDI CHAITHRA', htNo: '2007IA0527', linkedinUrl: 'https://www.linkedin.com/in/chaithra-jupudi-371179223/', role: 'SVE @ Google' },
  { slNo: 28, name: 'KALALI VEERA VENKATA SATWIK', htNo: '2007IA0528', linkedinUrl: 'https://www.linkedin.com/in/satwik-kalali-509249255/', role: 'NA' },
  { slNo: 29, name: 'KALVALA SHIVATHIMIKA', htNo: '2007IA0529', linkedinUrl: 'https://www.linkedin.com/in/shivathmika-kalvala-9284aa230/', role: null },
  { slNo: 30, name: 'KANNAREDDY SIDDHARTH REDDY', htNo: '2007IA0530', linkedinUrl: 'https://www.linkedin.com/in/siddharthreddyk/', role: 'Cybersecurity Associate at RSMUS LLP' },
  { slNo: 31, name: 'KESIREDDY ANIL REDDY', htNo: '2007IA0531', linkedinUrl: 'https://www.linkedin.com/in/anil-reddy-kesireddy-562986206/', role: 'Associate Software Engineer at GTM BUDDY' },
  { slNo: 32, name: 'KILAPU NAGA SAI ADITHRAM', htNo: '2007IA0532', linkedinUrl: null, role: null },
  { slNo: 33, name: 'KOLLU KAVYA', htNo: '2007IA0533', linkedinUrl: null, role: null },
  { slNo: 34, name: 'KONDAM SAI SRUTHIN REDDY', htNo: '2007IA0534', linkedinUrl: null, role: null },
  { slNo: 35, name: 'KUKATLA SIDDARTHA SHARATH', htNo: '2007IA0535', linkedinUrl: null, role: null },
  { slNo: 36, name: 'KUKUMOTHIMAPPA RAJNEE', htNo: '2007IA0536', linkedinUrl: null, role: null },
  { slNo: 37, name: 'KURMANDLA AKHILA', htNo: '2007IA0537', linkedinUrl: 'https://www.linkedin.com/in/akhila-kurmandla/', role: 'NA' },
  { slNo: 38, name: 'MADANABDINA SRINIDHI', htNo: '2007IA0538', linkedinUrl: 'https://www.linkedin.com/in/madanaboina-srinidhi/', role: 'Apprentice @ Lloyds Technology centre' },
  { slNo: 39, name: 'MALLELA BHAVIK', htNo: '2007IA0539', linkedinUrl: 'https://www.linkedin.com/in/mallela-bhavik/', role: 'Former IT Intern @Advance Auto Parts' },
  { slNo: 40, name: 'MANIJE SRI RAM ADITYA', htNo: '2007IA0540', linkedinUrl: 'https://www.linkedin.com/in/sriram-aditya/', role: 'Cloud Platform Engineer at Charles River Development, A State Street Company' },
  { slNo: 41, name: 'MANTHURI SHIVANI', htNo: '2007IA0541', linkedinUrl: 'https://www.linkedin.com/in/manthuri-shivani-b54388244/', role: 'Software Engineer@ JP Morgan Chase & Co.' },
  { slNo: 42, name: 'MERGU DEEPAK', htNo: '2007IA0542', linkedinUrl: 'https://www.linkedin.com/in/mergu-deepak-00a261214/', role: 'NA' },
  { slNo: 43, name: 'MURUGAVEL VISHNU PRIYA', htNo: '2007IA0543', linkedinUrl: 'https://www.linkedin.com/in/murugavelvishnupriya/', role: 'Software Engineer at CHUBB' },
  { slNo: 44, name: 'MUSKU AKSHITH REDDY', htNo: '2007IA0544', linkedinUrl: null, role: null },
  { slNo: 45, name: 'NIMMAGADDA LIKHITHA', htNo: '2007IA0545', linkedinUrl: 'https://www.linkedin.com/in/likhitha-nimmagadda-70bb6a204/', role: 'Software Engineer at F5' },
  { slNo: 46, name: 'NISHANTH SREEVAMSI BAHADURSHA', htNo: '2007IA0546', linkedinUrl: 'https://www.linkedin.com/in/nishanth-bahadursha-672453238/', role: 'SDE intern at nGenea' },
  { slNo: 47, name: 'P SAI SAKETH', htNo: '2007IA0547', linkedinUrl: null, role: null },
  { slNo: 48, name: 'PATTI VENKATA SWATHI', htNo: '2007IA0548', linkedinUrl: 'https://www.linkedin.com/in/swathi-patti-a268a6234/', role: 'NA' },
  { slNo: 49, name: 'PILLI SNEHITH', htNo: '2007IA0549', linkedinUrl: 'https://www.linkedin.com/in/snehith-pilli-9b1403213/', role: 'Cybersecurity Professional at LTIMindtree' },
  { slNo: 50, name: 'POSAM VARUN REDDY', htNo: '2007IA0550', linkedinUrl: 'https://www.linkedin.com/in/varun-reddy-posam-855a901b8/', role: null },
  { slNo: 51, name: 'PRANATHI BUSSA', htNo: '2007IA0551', linkedinUrl: 'https://www.linkedin.com/in/pranathi-bussa-787576237/', role: 'Associate Quality Analyst@Oracle' },
  { slNo: 52, name: 'RATHOD SAI GIRIDHAR PRASAD', htNo: '2007IA0552', linkedinUrl: 'https://www.linkedin.com/in/rathod-sai-giridhar-prasad-4b6037214/', role: 'DEVOPSENIGINEER_ATLIUS HUB' },
  { slNo: 53, name: 'SRIRAM SURAJ', htNo: '2007IA0553', linkedinUrl: 'https://www.linkedin.com/in/suraj-sriram/', role: null },
  { slNo: 54, name: 'THELUKUNTLA JAYACHANDRA', htNo: '2007IA0554', linkedinUrl: 'https://www.linkedin.com/in/thelukuntla-jayachandra-36322a221/', role: null },
  { slNo: 55, name: 'THIRUNAGARI SREESHMAN', htNo: '2007IA0555', linkedinUrl: 'https://www.linkedin.com/in/sreeshman-thirunagari-a50b7b241/', role: 'Software Engineer @LTI Mindtree' },
  { slNo: 56, name: 'VADDE PRIYANSHU', htNo: '2007IA0556', linkedinUrl: 'https://www.linkedin.com/in/priyanshu-vadde-359327204/', role: 'Cybersecurity Associate at RSMUS LLP' },
  { slNo: 57, name: 'VASA SIDDHARTH', htNo: '2007IA0557', linkedinUrl: null, role: null },
  { slNo: 58, name: 'VITTALADEVARAM SAI SRI ANJAN', htNo: '2007IA0558', linkedinUrl: 'https://www.linkedin.com/in/prithvi-v-42b411213/', role: 'Software Engineer at JPMorganChase' },
  { slNo: 59, name: 'Y V S SIDDHARTHA', htNo: '2007IA0559', linkedinUrl: null, role: null },
  { slNo: 60, name: 'YEDULLA ANOOP REDDY', htNo: '2007IA0560', linkedinUrl: 'https://www.linkedin.com/in/anoop-reddy-yedulla-6a2062226/', role: null }
  ,
    { slNo: 61, name: 'ARASADA B VENKATA AYUSH PATNAIK', htNo: '20071A0561', linkedinUrl: null, role: null },
    { slNo: 62, name: 'AREDLA LIKITHA REDDY', htNo: '20071A0562', linkedinUrl: 'https://www.linkedin.com/in/aredla-likitha-reddy-4919b6224?utm_source=share&utm_campaign=share_via&ut', role: null },
    { slNo: 63, name: 'NANDINI B', htNo: '20071A0563', linkedinUrl: 'https://www.linkedin.com/in/nandini-b-7538b5225?utm_source=share&utm_campaign=share_via&utm_content', role: null },
    { slNo: 64, name: 'BATHULA NEEHA', htNo: '20071A0564', linkedinUrl: 'https://www.linkedin.com/in/neeha-bathula?utm_source=share&utm_campaign=share_via&utm_content=profil', role: null },
    { slNo: 65, name: 'BATTHALA MADHAVI', htNo: '20071A0565', linkedinUrl: 'https://www.linkedin.com/in/madhavi-batthala-36583b204?utm_source=share&utm_campaign=share_via&utm', role: 'Software Engineer@J.P.Morgan Chase& Co.' },
    { slNo: 66, name: 'BAYARAPU HEMA SRI', htNo: '20071A0566', linkedinUrl: 'https://www.linkedin.com/in/hema-sri-bayarapu-0ab750225?utm_source=share&utm_campaign=share_via&utn', role: 'Associate Engineer@S&P Global' },
    { slNo: 67, name: 'BILLAKANTI SUSHMA', htNo: '20071A0567', linkedinUrl: 'https://www.linkedin.com/in/sushmabillakanti?utm_source=share&utm_campaign=share_via&utm_content=prc', role: null },
    { slNo: 68, name: 'CHALLA SAI VENKATA TEJA', htNo: '20071A0568', linkedinUrl: 'https://www.linkedin.com/in/saivenkatatejachalla?utm_source=share&utm_campaign=share_via&utm_content=', role: 'Software Analyst@Deloitte' },
    { slNo: 69, name: 'CHANDRA AKASH', htNo: '20071A0569', linkedinUrl: 'https://www.linkedin.com/in/akash-chandra-793b17226?utm_source=share&utm_campaign=share_via&utm_co', role: 'Product Engineer@Loyalty Juggernaut Inc.' },
    { slNo: 70, name: 'CHARITHA PARUCHURI', htNo: '20071A0570', linkedinUrl: 'https://www.linkedin.com/in/charitha-paruchuri-950448237?utm_source=share&utm_campaign=share_via&utm', role: null },
    { slNo: 71, name: 'CHEENURI PREETHAM', htNo: '20071A0571', linkedinUrl: 'https://www.linkedin.com/in/cheenuri-preetham?utm_source=share&utm_campaign=share_via&utm_content=', role: null },
    { slNo: 72, name: 'DHARAVATH SRIKAΝΤΗ', htNo: '20071A0572', linkedinUrl: null, role: null },
    { slNo: 73, name: 'EDDI KEERTHANA', htNo: '20071A0573', linkedinUrl: 'https://www.linkedin.com/in/eddi-keerthana-a07512226?utm_source=share&utm_campaign=share_via&utm_co', role: 'Software Engineer@Chubb' },
    { slNo: 74, name: 'EDULAPATLY VINAY VARDHAN', htNo: '20071A0574', linkedinUrl: null, role: null },
    { slNo: 75, name: 'EGA SATHWIKA', htNo: '20071A0575', linkedinUrl: 'https://www.linkedin.com/in/sathwika-ega-379663224?utm_source=share&utm_campaign=share_via&utm_con', role: 'Software Engineer@Bounteous x Accolite' },
    { slNo: 76, name: 'EMMADISETTY SHARANYA', htNo: '20071A0576', linkedinUrl: 'https://www.linkedin.com/in/sharanya-emmadisetty-921a5b204?utm_source=share&utm_campaign=share_via&', role: null },
    { slNo: 77, name: 'GONE KAVERI', htNo: '20071A0577', linkedinUrl: 'https://www.linkedin.com/in/gone-kaveri-651626225?utm_source=share&utm_campaign=share_via&utm_conte', role: null },
    { slNo: 78, name: 'GUDA PAVANEESHWAR REDDY', htNo: '20071A0578', linkedinUrl: null, role: null },
    { slNo: 79, name: 'KALUVALA NIHAL REDDY', htNo: '20071A0579', linkedinUrl: null, role: null },
    { slNo: 80, name: 'KANDADI SAI TEJA', htNo: '20071A0580', linkedinUrl: null, role: null },
    { slNo: 81, name: 'KARTHIKA AWALGAONKAR', htNo: '20071A0581', linkedinUrl: 'https://www.linkedin.com/in/awalgaonkar-karthika-645617204?utm_source=share&utm_campaign=share_via&', role: null },
    { slNo: 82, name: 'KODAVATIGANTI ANANDA RUWIK REDDY', htNo: '20071A0582', linkedinUrl: 'https://www.linkedin.com/in/anandarutvikreddy?utm_source=share&utm_campaign=share_via&utm_content=f', role: null },
    { slNo: 83, name: 'KOMARABATHINI KAVYA', htNo: '20071A0583', linkedinUrl: 'https://www.linkedin.com/in/komarabathini-kavya-00b671224?utm_source=share&utm_campaign=share_via&u', role: null },
    { slNo: 84, name: 'M ARTHI SAI', htNo: '20071A0584', linkedinUrl: 'https://www.linkedin.com/in/arthi-sai-m?utm_source=share&utm_campaign=share_via&utm_content=profile&', role: null },
    { slNo: 85, name: 'MALIPATEI SREE PRANAV REDDY', htNo: '20071A0585', linkedinUrl: null, role: 'Software Engineer@Chubb' },
    { slNo: 86, name: 'MANTHENA SUNIL', htNo: '20071A0586', linkedinUrl: 'https://www.linkedin.com/in/sunil-manthena-0276a2212?utm_source=share&utm_campaign=share_via&utm_c', role: 'Software Engineer@J.P.Morgan Chase& Co.' },
    { slNo: 87, name: 'MEESALA RITHIN', htNo: '20071A0587', linkedinUrl: 'https://www.linkedin.com/in/rithinmeesala?utm_source=share&utm_campaign=share_via&utm_content=profile', role: null },
    { slNo: 88, name: 'MOHAMMED ABDUL HASEEB', htNo: '20071A0588', linkedinUrl: 'https://www.linkedin.com/in/mohammedabdulhaseeb7?utm_source=share&utm_campaign=share_via&utm_co', role: 'Software Engineer@J.P.Morgan Chase& Co.' },
    { slNo: 89, name: 'MOHAMMED MUZAMMIL', htNo: '20071A0589', linkedinUrl: 'https://www.linkedin.com/in/mohammed-muzammil-9b8138225?utm_source=share&utm_campaign=share_via', role: 'Associate Cybersecurity@RSM US LLP' },
    { slNo: 90, name: 'MOHAMMED ZUBAIR', htNo: '20071A0590', linkedinUrl: 'https://www.linkedin.com/in/mohammed-zubair-74734a202?utm_source=share&utm_campaign=share_via&utn', role: null },
    { slNo: 91, name: 'MOTHUKURI VAMSHIDHAR', htNo: '20071A0591', linkedinUrl: null, role: null },
    { slNo: 92, name: 'MULLAGIRI HARSHITHA', htNo: '20071A0592', linkedinUrl: 'https://www.linkedin.com/in/harshitha-mullagiri?utm_source=share&utm_campaign=share_via&utm_content=p', role: null },
    { slNo: 93, name: 'NAGARAPU GEETHA', htNo: '20071A0593', linkedinUrl: 'https://www.linkedin.com/in/geetha-nagarapu-02869a213?utm_source=share&utm_campaign=share_via&utm_', role: 'Data network Engineer@TCS' },
    { slNo: 94, name: 'NAGIDI CHAITHANYA VARDHAN REDDY', htNo: '20071A0594', linkedinUrl: 'https://www.linkedin.com/in/chaithanyanagidi?utm_source=share&utm_campaign=share_via&utm_content=pro', role: null },
    { slNo: 95, name: 'NALLAPU ROHITH', htNo: '20071A0595', linkedinUrl: 'https://www.linkedin.com/in/rohith-nallapu-650207226?utm_source=share&utm_campaign=share_via&utm_co', role: null },
    { slNo: 96, name: 'NELTURI JAHNAVI', htNo: '20071A0596', linkedinUrl: null, role: null },
    { slNo: 97, name: 'ΝΕΜΜΑKANTI BALA VENKATA BHARATH', htNo: '20071A0597', linkedinUrl: null, role: null },
    { slNo: 98, name: 'NOMULA SRIJA REDDY', htNo: '20071A0598', linkedinUrl: null, role: 'Analyst-Product Engineering@Deloitte' },
    { slNo: 99, name: 'P SAI SHRUTHI', htNo: '20071A0599', linkedinUrl: null, role: null },
    { slNo: 100, name: 'PACHIPALA SAIBHARADWAJ', htNo: '20071A05A0', linkedinUrl: null, role: null },
    { slNo: 101, name: 'PALARAPU SAKET', htNo: '20071A05A1', linkedinUrl: 'https://www.linkedin.com/in/saket-palarapu-270652204?utm_source=share&utm_campaign=share_via&utm_cc', role: null },
    { slNo: 102, name: 'POTLA VIVEK', htNo: '20071A05A2', linkedinUrl: 'https://www.linkedin.com/in/vivekpotla?utm_source=share&utm_campaign=share_via&utm_content=profile&u', role: null },
    { slNo: 103, name: 'RAJOLI V PRANEETH SIDDHARTHA REDDY', htNo: '20071A05A3', linkedinUrl: 'https://www.linkedin.com/in/rajoli-v-praneeth-siddhartha-reddy-31b889227?utm_source=share&utm_campaign', role: null },
    { slNo: 104, name: 'S CHANDANA', htNo: '20071A05A4', linkedinUrl: 'https://www.linkedin.com/in/chandana-s-9950a7214?utm_source=share&utm_campaign=share_via&utm_conte', role: null },
    { slNo: 105, name: 'S RAVI TEJA', htNo: '20071A05A5', linkedinUrl: null, role: null },
    { slNo: 106, name: 'SANDEEP REDDY DODDA', htNo: '20071A05A6', linkedinUrl: 'https://www.linkedin.com/in/sandeepreddydodda?utm_source=share&utm_campaign=share_via&utm_content=', role: null },
    { slNo: 107, name: 'SANKIRTH POLSANI', htNo: '20071A05A7', linkedinUrl: 'https://www.linkedin.com/in/sankirth-rao-polsani-379795228?utm_source=share&utm_campaign=share_via&ut', role: null },
    { slNo: 108, name: 'SILIVERU SURESH', htNo: '20071A05A8', linkedinUrl: 'https://www.linkedin.com/in/siliveru-suresh-773301215?utm_source=share&utm_campaign=share_via&utm_co', role: null },
    { slNo: 109, name: 'SIRIVOLU SAI SAMANVITHA', htNo: '20071A05A9', linkedinUrl: null, role: null },
    { slNo: 110, name: 'SOLLU YASHWANTH SAI', htNo: '20071A05B0', linkedinUrl: 'https://www.linkedin.com/in/yashwanth-sai-sollu-009a50201?utm_source=share&utm_campaign=share_via&ut', role: null },
    { slNo: 111, name: 'SOUMIKA MALLIDI', htNo: '20071A05B1', linkedinUrl: 'https://www.linkedin.com/in/soumika-mallidi-48aaa8216?utm_source=share&utm_campaign=share_via&utm_c', role: null },
    { slNo: 112, name: 'SREYA TIRUMALARAJU', htNo: '20071A05B2', linkedinUrl: 'https://www.linkedin.com/in/sreya-tirumalaraju-ba34b4213?utm_source=share&utm_campaign=share_via&utm', role: null },
  { slNo: 113, name: 'TATLURI NIKHITHA DEVI', htNo: '20071A05B3', linkedinUrl: null, role: null },
    { slNo: 114, name: 'TEJESWARA MURTHY PALWADI', htNo: '20071A05B4', linkedinUrl: 'https://www.linkedin.com/in/tejeswara-murthy-palwadi-83b718204?utm_source=share&utm_campaign=share_', role: null },
    { slNo: 115, name: 'TELUGU SINDHU', htNo: '20071A05B5', linkedinUrl: 'https://www.linkedin.com/in/sindhu-telugu-53a158227?utm_source=share&utm_campaign=share_via&utm_cor', role: null },
    { slNo: 116, name: 'THATIPELLI ABHINAYA', htNo: '2007IA0586', linkedinUrl: 'https://www.linkedin.com/in/thatipelli-abhinaya-97a120227?utm_source=share&utm_campaign=share_via&utm', role: null },
    { slNo: 117, name: 'TODIMA HARSHITHA', htNo: '2007IA05B7', linkedinUrl: 'https://www.linkedin.com/in/todima-harshitha-171137227?utm_source=share&utm_campaign=share_via&utm_', role: null },
    { slNo: 118, name: 'VADIYALA ANKITHA', htNo: '2007IA05B8', linkedinUrl: null, role: null },
    { slNo: 119, name: 'VIBUDI DURGA VARA PRASAD', htNo: '2007IA0589', linkedinUrl: 'https://www.linkedin.com/in/durgavaraprasadvibudi?utm_source=share&utm_campaign=share_via&utm_conte', role: null },
    { slNo: 120, name: 'VITTEDI MANOJ', htNo: '2007IA05C0', linkedinUrl: 'https://www.linkedin.com/in/vittedi-manoj-reddy-73b874253?utm_source=share&utm_campaign=share_via&ut', role: null }
  ,
    {
      slNo: 121,
      name: "Addanki Jyothirmai",
      htNo: "20071A05C1",
      linkedinUrl: "https://www.linkedin.com/in/addanki-jyothirmai-930453227",
      role: "Software Engineer 1 at Dell Technologies"
    },
    {
      slNo: 122,
      name: "Adusumalli Ramya",
      htNo: "20071A05C2",
      linkedinUrl: "https://www.linkedin.com/in/adusumalli-ramya-07911b22b",
      role: "NA"
    },
    {
      slNo: 125,
      name: "Balusa Indhu Priya",
      htNo: "20071A05C5",
      linkedinUrl: "https://www.linkedin.com/in/indhu-priya-b8228320b",
      role: "NA"
    },
    {
      slNo: 126,
      name: "Basuthkar Likhita",
      htNo: "20071A05C6",
      linkedinUrl: "https://www.linkedin.com/in/likhita-basuthkar",
      role: "MS in Computer Science @ USC"
    },
    {
      slNo: 127,
      name: "Bathini Akhil",
      htNo: "20071A05C7",
      linkedinUrl: "https://www.linkedin.com/in/akhil-bathini-410a13234",
      role: "RealPage Intern"
    },
    {
      slNo: 128,
      name: "Bhojanapally Abhinav Sudhanu",
      htNo: "20071A05C8",
      linkedinUrl: "https://www.linkedin.com/in/abhinav-sudhanv-bhojanapally-669898238",
      role: "Cybersecurity Associate at RSM USI"
    },
    {
      slNo: 129,
      name: "Bojja Srivalli",
      htNo: "20071A05C9",
      linkedinUrl: "https://www.linkedin.com/in/srivalli-bojja-13241117b",
      role: "Technical System Engineer - TCS"
    },
    {
      slNo: 130,
      name: "Chathala Swapna",
      htNo: "20071A05D0",
      linkedinUrl: "https://www.linkedin.com/in/chathala-swapna-7989b0226",
      role: "Graduate Engineer Trainee at Coforge"
    },
    {
      slNo: 131,
      name: "Cherukoori Komali",
      htNo: "20071A05D1",
      linkedinUrl: "https://www.linkedin.com/in/cherukoori-komali",
      role: "Application Engineer 1 at Flipkart"
    },
    {
      slNo: 133,
      name: "Desireddy Monika",
      htNo: "20071A05D3",
      linkedinUrl: "https://www.linkedin.com/in/monika-desireddy-08a2041b9",
      role: "Software Engineer 1 at JPMorgan Chase"
    },
    {
      slNo: 134,
      name: "Dodla Sai Deepthi",
      htNo: "20071A05D4",
      linkedinUrl: "https://www.linkedin.com/in/dodla-sai-deepthi-800922235",
      role: "Associate at PwC"
    },
    {
      slNo: 135,
      name: "Duddukuri Sree Sumanth",
      htNo: "20071A05D5",
      linkedinUrl: "https://www.linkedin.com/in/sree-sumanth-duddukuri",
      role: "Associate Software Engineer at Oracle"
    },
    {
      slNo: 136,
      name: "Eloori Karthik",
      htNo: "20071A05D6",
      linkedinUrl: "https://www.linkedin.com/in/karthik-eloori-6b459a20b",
      role: "MS at University of South Florida"
    },
    {
      slNo: 137,
      name: "Gaddampally Shreyas Reddy",
      htNo: "20071A05D7",
      linkedinUrl: "https://www.linkedin.com/in/shreyasreddy-gaddampally",
      role: "MS at Stony Brook University"
    },
    {
      slNo: 138,
      name: "Gattamaneni Bharath Kumar",
      htNo: "20071A05D8",
      linkedinUrl: "https://www.linkedin.com/in/bharath-kumar-gattamaneni",
      role: "Software Engineer at Ideagen"
    },
    {
      slNo: 139,
      name: "Gautham Mallipeddi",
      htNo: "20071A05D9",
      linkedinUrl: "https://www.linkedin.com/in/gautham-mallipeddi",
      role: "Software Engineer at SenseHawk"
    },
    {
      slNo: 141,
      name: "Gudimetla Satya Manjunadha Reddy",
      htNo: "20071A05E1",
      linkedinUrl: "https://www.linkedin.com/in/satya-manjunadha-reddy-gudimetla-5636561b4",
      role: "Management at GIM"
    },
    {
      slNo: 142,
      name: "Gunnalle Apurva",
      htNo: "20071A05E2",
      linkedinUrl: "https://www.linkedin.com/in/apurvagunnalle",
      role: "Software Engineer at JPMC"
    },
    {
      slNo: 145,
      name: "Komaravelli Ananya",
      htNo: "20071A05E5",
      linkedinUrl: "https://www.linkedin.com/in/ananya-komaravelli123",
      role: "Associate at PwC"
    },
    {
      slNo: 146,
      name: "Kommineni Srinivasa Deepesh",
      htNo: "20071A05E6",
      linkedinUrl: "https://www.linkedin.com/in/kommineni-srinivasa-deepesh-0b9ba51b9",
      role: "Software Engineer I at JPMC"
    },
    {
      slNo: 147,
      name: "Kottakota Akhilesh Kumandan",
      htNo: "20071A05E7",
      linkedinUrl: "https://www.linkedin.com/in/akhilesh-kumandan-418188211",
      role: "Software Engineer at Chubb"
    },
    {
      slNo: 148,
      name: "KP Mani Teja",
      htNo: "20071A05E8",
      linkedinUrl: "https://www.linkedin.com/in/mani-teja-03a305212/",
      role: "Software Engineer at HYPERGRID Technology Solution"
    },
    {
      slNo: 149,
      name: "M Poojitha",
      htNo: "20071A05E9",
      linkedinUrl: "http://linkedin.com/in/poojitha-m-98b339226/",
      role: "NA"
    },
    {
      slNo: 150,
      name: "Madapogu Jessica Pearl",
      htNo: "20071A05F0",
      linkedinUrl: "https://www.linkedin.com/in/jessica-pearl-madapogu-895452237/",
      role: "SDE I at F5"
    },
    {
      slNo: 151,
      name: "Malle Srinidhi",
      htNo: "20071A05F1",
      linkedinUrl: "https://www.linkedin.com/in/srinidhi-malle-033518226/",
      role: "NA"
    },
    {
      slNo: 152,
      name: "Manda Akash",
      htNo: "20071A05F2",
      linkedinUrl: "https://www.linkedin.com/in/manda-akash/",
      role: "SDE at Rapidious"
    },
    {
      slNo: 153,
      name: "Mohammad Shoaib",
      htNo: "20071A05F3",
      linkedinUrl: "https://www.linkedin.com/in/mohammad-shoaib-53107a233/",
      role: "Packaged App Development at Accenture"
    },
    {
      slNo: 154,
      name: "Muthineni Sathvik",
      htNo: "20071A05F4",
      linkedinUrl: "https://www.linkedin.com/in/sathvik-muthineni-4b57aa237/",
      role: "NA"
    },
    {
      slNo: 156,
      name: "Naram Tapan Ganesh",
      htNo: "20071A05F6",
      linkedinUrl: "https://www.linkedin.com/in/tapan-ganesh-naram/",
      role: "Software Engineer I @ JPMorgan Chase & Co."
    },
    {
      slNo: 157,
      name: "Narne Adarsh",
      htNo: "20071A05F7",
      linkedinUrl: "https://www.linkedin.com/in/adarsh-narne-754302238/",
      role: "Co Founder - Auspicious"
    },
    {
      slNo: 158,
      name: "Narra Pallavi",
      htNo: "20071A05F8",
      linkedinUrl: "https://www.linkedin.com/in/pallavi-narra-06650923a/",
      role: "NA"
    },
    {
      slNo: 159,
      name: "Neha Kakarla",
      htNo: "20071A05F9",
      linkedinUrl: "https://www.linkedin.com/in/nehakakarla/",
      role: "Analyst at Deloitte USI"
    },
    {
      slNo: 160,
      name: "Palusa Sai Neeraj Goud",
      htNo: "20071A05G0",
      linkedinUrl: "https://www.linkedin.com/in/sai-neeraj-goud-1890b6244/",
      role: "SE at Accenture"
    },
    {
      slNo: 161,
      name: "Pambala Beaula Priya Darshini",
      htNo: "20071A05G1",
      linkedinUrl: "https://www.linkedin.com/in/beaula-priya-darshini/",
      role: "Associate Software Engineer at GlobalLogic"
    },
    {
      slNo: 163,
      name: "Puspur Nithin Kumar",
      htNo: "20071A05G3",
      linkedinUrl: "https://www.linkedin.com/in/dnithinkumar/",
      role: "Fellow at NxtWave’s CCBP 4.0 Academy"
    },
    {
      slNo: 166,
      name: "Sai Preeti Paruchuru",
      htNo: "20071A05G6",
      linkedinUrl: "https://www.linkedin.com/in/sai-preeti-paruchuru-8b118b228/",
      role: "NA"
    },
    {
      slNo: 168,
      name: "Sangem Anish",
      htNo: "20071A05G8",
      linkedinUrl: "https://www.linkedin.com/in/anish-sangem/",
      role: "System Engineer at TCS"
    },
    {
      slNo: 169,
      name: "Saniya Tabassum",
      htNo: "20071A05G9",
      linkedinUrl: "https://www.linkedin.com/in/saniya-tabassum-b23515210/",
      role: "Application Engineer 1 at Flipkart"
    },
    {
      slNo: 170,
      name: "Santh Sandhya",
      htNo: "20071A05H0",
      linkedinUrl: "https://www.linkedin.com/in/santh-sandhya-3b3192233/",
      role: "Associate Software Engineer at S&P Global"
    },
    {
      slNo: 171,
      name: "Satuluri Harini Madhu Priya",
      htNo: "20071A05H1",
      linkedinUrl: "https://www.linkedin.com/in/satuluri-harini-madhu-priya-b1566a214/",
      role: "Analyst at Deloitte"
    },
    {
      slNo: 173,
      name: "Srilasya V G Kompella",
      htNo: "20071A05H3",
      linkedinUrl: "https://www.linkedin.com/in/srilasya-kompella-957b28222/",
      role: "SDE-1 at AMD XILINX"
    },
    {
      slNo: 175,
      name: "Tangellapally Nitheesh",
      htNo: "20071A05H5",
      linkedinUrl: "https://www.linkedin.com/in/nitheesh-tangellapally/",
      role: "Software Engineer at Chubb"
    },
    {
      slNo: 176,
      name: "Theerdala Sri Harshitha",
      htNo: "20071A05H6",
      linkedinUrl: "https://www.linkedin.com/in/theerdala-sri-harshitha-393351237/",
      role: "Program Analyst Trainee at Cognizant"
    },
    {
      slNo: 179,
      name: "Vidiyala Anishka Rao",
      htNo: "20071A05H9",
      linkedinUrl: "https://www.linkedin.com/in/anishka-rao-3a9311226/",
      role: "Winter Intern at S&P Global"
    },
    {
      slNo: 180,
      name: "Yeluru Vinay Chand",
      htNo: "20071A05J0",
      linkedinUrl: "https://www.linkedin.com/in/vinay-chand-yeluru/",
      role: "NA"
    },
      {
        slNo: 181,
        name: "APOORVA YARLAGADDA",
        htNo: "20071A05J1",
        linkedinUrl: "https://www.linkedin.com/in/apoorva-yarlagadda1827",
        role: "Packaged App Development Associate @ Accenture"
      },
      {
        slNo: 182,
        name: "ARETLA PRANEETH",
        htNo: "20071A05J2",
        linkedinUrl: "https://www.linkedin.com/in/aretla-praneeth-807641249",
        role: null
      },
      {
        slNo: 183,
        name: "AULUGALA VINAY KUMAR",
        htNo: "20071A05J3",
        linkedinUrl: "https://www.linkedin.com/in/aulugala-vinay-kumar-612536226",
        role: "System Engineer @ Tata Consultancy Services"
      },
      {
        slNo: 184,
        name: "B NEHA REDDY",
        htNo: "20071A05J4",
        linkedinUrl: "https://www.linkedin.com/in/bnehareddy1010",
        role: "Associate 2 @ State Street"
      },
      {
        slNo: 185,
        name: "BANDARU SIRI",
        htNo: "20071A05J5",
        linkedinUrl: "https://www.linkedin.com/in/siribandaru",
        role: "Packaged App Development Associate @ Accenture"
      },
      {
        slNo: 186,
        name: "BELIDE PRASANNA LAXMI",
        htNo: "20071A0SJ6",
        linkedinUrl: null,
        role: null
      },
      {
        slNo: 187,
        name: "BHANU TEJA CHAPALA",
        htNo: "20071A05J7",
        linkedinUrl: "https://www.linkedin.com/in/bhanu-teja-ch",
        role: "Software Developer @ Im-Par"
      },
      {
        slNo: 188,
        name: "BUSSA SUMUKHI",
        htNo: "20071A05J8",
        linkedinUrl: "https://www.linkedin.com/in/sumukhi-bussa-7953a320b",
        role: null
      },
      {
        slNo: 189,
        name: "BUTALI RAMESH",
        htNo: "20071A05J9",
        linkedinUrl: "https://www.linkedin.com/in/butali-ramesh",
        role: "Technical Consultant @ Shahgaron"
      },
      {
        slNo: 190,
        name: "C S N V RAM SREE SANTHOSH",
        htNo: "20071A05K0",
        linkedinUrl: "https://www.linkedin.com/in/ram-sree-santhosh-c-s-n-v-752359226",
        role: "Software Engineer @ Zebu Intelligent Systems"
      },
      {
        slNo: 191,
        name: "CHINDAM POOJITHA",
        htNo: "20071A05K1",
        linkedinUrl: "https://www.linkedin.com/in/chindam-poojitha-15297b226",
        role: "Packaged App Development Associate @ Accenture"
      },
      {
        slNo: 192,
        name: "CHINTAKUNTLA HARSHAVARDHAN REDDY",
        htNo: "20071A05K2",
        linkedinUrl: null,
        role: null
      },
      {
        slNo: 193,
        name: "CHIRANJIVA RAO ATLURI",
        htNo: "20071A05K3",
        linkedinUrl: "https://www.linkedin.com/in/atluri-chiranjiva-rao/",
        role: null
      },
      {
        slNo: 194,
        name: "DURGAM SRIDHAR",
        htNo: "20071A0SK4",
        linkedinUrl: null,
        role: null
      },
      {
        slNo: 195,
        name: "GADDAM SAITEJA REDDY",
        htNo: "20071A05K5",
        linkedinUrl: null,
        role: null
      },
      {
        slNo: 196,
        name: "GADDAM SHIVA KUMAR REDDY",
        htNo: "20071A05K6",
        linkedinUrl: "https://www.linkedin.com/in/shivakumar19/",
        role: "Associate Quality Analyst @ Oracle"
      },
      {
        slNo: 197,
        name: "GAVINI SREYA",
        htNo: "20071A05K7",
        linkedinUrl: "https://www.linkedin.com/in/gavini-sreya-135665237/",
        role: "Software Engineer 1 @ JPMorgan Chase & Co"
      },
      {
        slNo: 198,
        name: "GORUGANTULA V S J KARTHIK",
        htNo: "20071A05K8",
        linkedinUrl: "https://www.linkedin.com/in/karthik-gorugantula-8220051b9/",
        role: "Junior Software Developer @ Advance Auto Parts"
      },
      {
        slNo: 199,
        name: "GUJJU PAVAN TEJA",
        htNo: "20071A05K9",
        linkedinUrl: "https://www.linkedin.com/in/gujju-pavan-teja-b41809253/",
        role: "Assosciate Software Engineer @ Tech Mahindra"
      },
      {
        slNo: 200,
        name: "IREDDY SAIPRAKASH REDDY",
        htNo: "20071A05M0",
        linkedinUrl: "https://www.linkedin.com/in/sai-prakash-ireddy-63337921b/",
        role: "ASE @ Accenture"
      },
      {
        slNo: 201,
        name: "JUHEE VARMA",
        htNo: "20071A05M1",
        linkedinUrl: "https://www.linkedin.com/in/juheevarma/",
        role: "Software Engineer @ Chubb"
      },
      {
        slNo: 202,
        name: "KADARLA ANUSREE",
        htNo: "20071A05M2",
        linkedinUrl: "https://www.linkedin.com/in/kadarla-anusree-170440223/",
        role: "Oracle NetSuite"
      },
      {
        slNo: 203,
        name: "KAMBHAMPATI KODANDA SAI HARSHITHA",
        htNo: "20071A05M3",
        linkedinUrl: "https://www.linkedin.com/in/kambhampati-kodanda-sai-harshitha-319936216/",
        role: null
      },
      {
        slNo: 204,
        name: "KANDULA JAYAKAR",
        htNo: "20071A05M4",
        linkedinUrl: "https://www.linkedin.com/in/jayakar-kandula-823978290/",
        role: null
      },
      {
        slNo: 205,
        name: "KARRE HANISH",
        htNo: "20071A05M5",
        linkedinUrl: "https://www.linkedin.com/in/karre-hanish-4692b7227/",
        role: "Associate Quality Analyst @ Oracle"
      },
      {
        slNo: 206,
        name: "KATAKAM ASHRITHA",
        htNo: "20071A05M6",
        linkedinUrl: "https://www.linkedin.com/in/ashritha-katakam-081968212/",
        role: "Software Developer @ JPMorgan Chase&Co"
      },
      {
        slNo: 207,
        name: "KOPILA ANURAG",
        htNo: "20071A05M7",
        linkedinUrl: "https://www.linkedin.com/in/anuragkopila/",
        role: null
      },
      {
        slNo: 208,
        name: "KULURU SUDEEP REDDY",
        htNo: "20071A05M8",
        linkedinUrl: null,
        role: null
      },
      {
        slNo: 209,
        name: "KUMMARI SHASHIDHAR",
        htNo: "20071A05M9",
        linkedinUrl: null,
        role: null
      },
      {
        slNo: 210,
        name: "KURVA AKHILESH KUMAR",
        htNo: "20071A05N0",
        linkedinUrl: "https://www.linkedin.com/in/kurva-akhilesh-kumar/",
        role: "Software Engineer @ Edwisely"
      },
      {
        slNo: 211,
        name: "MANGINAPALLY SHIVA PRASAD",
        htNo: "20071A05N1",
        linkedinUrl: "https://www.linkedin.com/in/manginapally-shiva-prasad-7b8a87212/",
        role: null
      },
      {
        slNo: 212,
        name: "MANIKARAO VENKATA SAHITH",
        htNo: "20071A05N2",
        linkedinUrl: null,
        role: null
      },
      {
        slNo: 213,
        name: "MEDIPALLY ABINAY",
        htNo: "20071A05N3",
        linkedinUrl: "https://www.linkedin.com/in/medipally-abinay-897a84225/",
        role: "Software Engineer IAM Engineering @ Providence"
      },
      {
        slNo: 214,
        name: "MOOLA SAI SUDHA",
        htNo: "20071A05N4",
        linkedinUrl: "https://www.linkedin.com/in/sudhamoola/",
        role: "Incoming Summer Intern@ Global Payments"
      },
      {
        slNo: 215,
        name: "MOVVA NAVATHA",
        htNo: "20071A05N5",
        linkedinUrl: "https://www.linkedin.com/in/navatha-movva-99581a200/",
        role: "Software Engineer @ JPMorganChase"
      },
      {
        slNo: 216,
        name: "PANDIRI SAI DUSHYANTH",
        htNo: "20071A05N6",
        linkedinUrl: "https://www.linkedin.com/in/sai-dushyanth-pandiri-4b64a7239/",
        role: "Application Engineer @ Alight Solutions"
      },
      {
        slNo: 217,
        name: "PASHAM NARENDRA KUMAR",
        htNo: "20071A05N7",
        linkedinUrl: "https://www.linkedin.com/in/pasham-narendra-kumar-8383b0233/",
        role: "Corp tech @ LSEG(London Stock Exchange Group)"
      },
      {
        slNo: 218,
        name: "PASHAM NITEESH REDDY",
        htNo: "20071A05N8",
        linkedinUrl: "https://www.linkedin.com/in/nitheesh-reddy-993846219/",
        role: "DC Analyst @ Deloitte USI"
      },
      {
        slNo: 219,
        name: "PATHA SRIJA",
        htNo: "20071A05N9",
        linkedinUrl: "https://www.linkedin.com/in/srija-patha-05354a234/",
        role: "Assosciate Quality Analyst @ ORacle"
      },
      {
        slNo: 220,
        name: "PENDYALA DIVYA TEJA",
        htNo: "20071A05P0",
        linkedinUrl: "https://www.linkedin.com/in/divya-teja-pendyala-252051200/",
        role: "Technical Analyst @ Darwinbox"
      },
      {
        slNo: 221,
        name: "PULIPAKA PAUL SANDEEP",
        htNo: "20071A05P1",
        linkedinUrl: "https://www.linkedin.com/in/sandeep-pulipaka-758267237/",
        role: "Packaged App Development Associate@Accenture"
      },
      {
        slNo: 222,
        name: "RASHMITHA NAYAK",
        htNo: "20071A05P2",
        linkedinUrl: "https://www.linkedin.com/in/rashmitha-nayak-07b22b223/",
        role: "Associate @PWC"
      },
      {
        slNo: 223,
        name: "REDDYSHETTY SAMPREETH",
        htNo: "20071A05P3",
        linkedinUrl: "https://www.linkedin.com/in/sampreeth-reddyshetty-b4250322a/",
        role: null
      },
      {
        slNo: 224,
        name: "RISHIKA REDDY BADDAM",
        htNo: "20071A05P4",
        linkedinUrl: "https://www.linkedin.com/in/rishika-baddam-68010920b/",
        role: null
      },
      {
        slNo: 225,
        name: "S DURGA PRASAD",
        htNo: "20071A05P5",
        linkedinUrl: "https://www.linkedin.com/in/s-durga-prasad-87676722a/",
        role: "Frontend Engineer @Kofluence"
      },
      {
        slNo: 226,
        name: "S V SAI SRIKAR",
        htNo: "20071A05P6",
        linkedinUrl: null,
        role: null
      },
      {
        slNo: 227,
        name: "SAI AKHIL KAKUMANU",
        htNo: "20071A05P7",
        linkedinUrl: "https://www.linkedin.com/in/sai-akhil-kakumanu/",
        role: "SDE Apprentice @ S&P Global"
      },
      {
        slNo: 228,
        name: "SAMA SARTHAN",
        htNo: "20071A05P8",
        linkedinUrl: "https://www.linkedin.com/in/sarthan-s-89a43b2b8/",
        role: null
      },
      {
        slNo: 229,
        name: "SHAIK JNAVED",
        htNo: "20071A05P9",
        linkedinUrl: "https://www.linkedin.com/in/shaik-jnaved-760513226/",
        role: null
      },
      {
        slNo: 230,
        name: "SHAIK SABEEHA KOUSER",
        htNo: "20071A05MQ0",
        linkedinUrl: "https://www.linkedin.com/in/shaiksabeehakouser/",
        role: "Jr Analyst Intern @ ES"
      },
      {
        slNo: 231,
        name: "SHIVANI VISHLAVATH",
        htNo: "20071A05MQ1",
        linkedinUrl: "https://www.linkedin.com/in/shivani-vishlavath-4b3b95223/",
        role: "Solution Consultant @ Caelius Consulting"
      },
      {
        slNo: 232,
        name: "SRIRANGAM SREEJA",
        htNo: "20071A05MQ2",
        linkedinUrl: "https://www.linkedin.com/in/sreeja-srirangam-286451226/",
        role: "Packaged App Development Associate@Accenture"
      },
      {
        slNo: 233,
        name: "SRISTI KRISHNA KIRAN",
        htNo: "20071A05MQ3",
        linkedinUrl: "https://www.linkedin.com/in/krishna-kiran-sristi-7085681bb/",
        role: "Engineering Trainee @ Kofluence"
      },
      {
        slNo: 234,
        name: "SURE PRAVALIKA",
        htNo: "20071A05MQ4",
        linkedinUrl: "https://www.linkedin.com/in/pravalika-sure-abbb661ba/",
        role: null
      },
      {
        slNo: 235,
        name: "THOKALA AKSHITH REDDY",
        htNo: "20071A05MQ5",
        linkedinUrl: "https://www.linkedin.com/in/akshith-reddy-thokala-12417121b/",
        role: "DC Analyst @ Deloitte USI"
      },
      {
        slNo: 236,
        name: "TUMU SAI PRANAV",
        htNo: "20071A05MQ6",
        linkedinUrl: null,
        role: null
      },
      {
        slNo: 237,
        name: "VADTHYA DEEPAK",
        htNo: "20071A05MQ7",
        linkedinUrl: "https://www.linkedin.com/in/deepak-vadthya/",
        role: null
      },
      {
        slNo: 238,
        name: "VARAKANTHAM DILIP KUMAR",
        htNo: "20071A05MQ8",
        linkedinUrl: "https://www.linkedin.com/in/dilip-kumar-8a013b225/",
        role: null
      },
      {
        slNo: 239,
        name: "YASWANTH SAI YADLAPALLI",
        htNo: "20071A05MQ9",
        linkedinUrl: "https://www.linkedin.com/in/yaswanth-sai-yadlapalli-77640122a/",
        role: null
      },
      {
        slNo: 240,
        name: "YELALA CHINNOLA KRUTHIK REDDY",
        htNo: "20071A05MR0",
        linkedinUrl: "https://www.linkedin.com/in/kruthik-reddy-441b742b3/",
        role: null
      } 
];

const seedDatabase = async () => {
  try {
    // Clear existing student data
    await Student.deleteMany({});
    
    // Insert new data
    await Student.insertMany(studentData);
    
    console.log('Student database seeded successfully');
    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDatabase();

