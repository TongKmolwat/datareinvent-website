/* =====================================================
   Data Reinvent — Article Data
   -----------------------------------------------------
   Single source of truth for the Insights cards on the
   homepage. script.js (see initArticles) renders the
   grid and pagination from this array.

   TO PUBLISH A NEW ARTICLE:
     1. Build the article's own HTML page as usual
        (copy an existing one, e.g. excel-lambda-functions.html).
     2. Add one object below with that page's metadata.
   No edits to index.html are needed — the grid and page
   count update automatically, 6 cards per page.

   thumbnail.type must match a key in THUMBNAIL_RENDERERS
   (script.js). thumbnail.colors is a [from, to] gradient
   pair. Reuse a type, or add a new one, as needed.
   type: 'image' renders a real photo/screenshot instead —
   set thumbnail.src (and optionally thumbnail.alt) rather
   than colors.
===================================================== */

const ARTICLES = [
  {
    id: 'dynamic-field-parameter-power-bi',
    href: 'ปรับเปลี่ยนมิติมุมมองข้อมูลแบบ-dynamic-ด้วย-field-parameter.html',
    category: 'Power BI',
    title: 'ปรับเปลี่ยนมิติมุมมองข้อมูลแบบ Dynamic ด้วย Field Parameter',
    description: 'เปลี่ยน Visual เดียวให้ตอบได้หลายคำถาม ด้วย Field Parameter',
    author: 'Reinvent Data',
    readTime: 'อ่าน 9 นาที',
    thumbnail: { type: 'image', src: 'Field Parameter.JPG', alt: 'ปรับเปลี่ยนมิติมุมมองข้อมูลแบบ Dynamic ด้วย Field Parameter' }
  },
  {
    id: 'power-bi-pro-license-check',
    href: 'วิธีเช็คง่ายๆว่าเรามี-power-bi-pro-license-หรือเปล่า.html',
    category: 'Power BI',
    title: 'วิธีเช็คง่ายๆว่าเรามี Power BI Pro License หรือเปล่า?',
    description: 'หลายคนอาจจะสงสัยว่า  Power BI บนเครื่องเราเป็น  License แบบ Pro หรือเปล่า?',
    author: 'Reinvent Data',
    readTime: 'อ่าน 3 นาที',
    thumbnail: { type: 'image', src: 'Check Power BI License.jpg', alt: 'วิธีเช็คง่ายๆว่าเรามี Power BI Pro License หรือเปล่า?' }
  },
  {
    id: 'beyond-pl-300-dax-for-humans',
    href: 'แชร์สไลด์-beyond-pl-300-the-definitive-guide-to-dax-for-humans.html',
    category: 'Power BI',
    title: 'แชร์สไลด์ "Beyond PL - 300: The Definitive Guide to DAX for Humans"',
    description: 'แชร์สไลด์ที่ไปพูดในงาน DATA DAY – STUDY GROUP 2026',
    author: 'Reinvent Data',
    readTime: 'อ่าน 5 นาที',
    thumbnail: { type: 'image', src: 'Beyond PL-300 Slide Page.jpg', alt: 'แชร์สไลด์ "Beyond PL - 300: The Definitive Guide to DAX for Humans"' }
  },
  {
    id: 'esg-analytics-with-excel',
    href: 'esg-analytics-with-excel.html',
    category: 'Book Review',
    title: 'รีวิวหนังสือ DAX FOR HUMANS ที่ทำให้ DAX เข้าใจง่ายกว่าที่คิด',
    description: 'ไปสะดุดกับหนังสือ Power BI ปกจัดจ้านเหมือนโปสเตอร์หนัง Sci-Fi เข้าโดยบังเอิญ แล้วก็วางไม่ลงจนต้องซื้อมาเก็บไว้เอง',
    author: 'Reinvent Data',
    readTime: 'อ่าน 4 นาที',
    thumbnail: { type: 'image', src: 'DAX For Human.png', alt: 'ปกหนังสือ DAX FOR HUMANS โดย Greg Deckler' }
  },
  {
    id: 'excel-variance-number-formatting',
    href: 'excel-variance-number-formatting.html',
    category: 'Excel',
    title: 'จัดรูปแบบตัวเลขผลต่างให้ "อ่านเข้าใจได้เอง" ภายในไม่กี่วินาที',
    description: 'เทคนิคผสาน TEXT กับ CONCATENATE ที่เปลี่ยนตัวเลขเทียบปีต่อปีดิบๆ ให้กลายเป็นป้ายตัวเลขพร้อมใช้งานในรายงาน โดยไม่ต้องมานั่งพิมพ์คอมม่าทีละแถว',
    author: 'Reinvent Data',
    readTime: 'อ่าน 5 นาที',
    thumbnail: { type: 'image', src: 'Format Number.PNG', alt: 'ตัวอย่างการจัดรูปแบบตัวเลขความแปรปรวนใน Excel' }
  },
  {
    id: 'implicit-vs-explicit-measure-power-bi',
    href: 'การคำนวณ-implicit-vs-explicit-measure-บน-power-bi.html',
    category: 'Power BI',
    title: 'การคำนวณ Implicit VS Explicit Measure บน Power BI',
    description: 'การคำนวณทั้งสองแบบให้ "ตัวเลข" ออกมาเหมือนกัน แต่หลายคนงงกันว่า Implicit Measure และ Explicit Measure ก่อนจะอธิบายว่าจะใช้ยังไง ขออธิบายความหมายการคำนวณทั้งสองแบบก่อน',
    author: 'Reinvent Data',
    readTime: 'อ่าน 5 นาที',
    thumbnail: { type: 'image', src: 'Implicit VS Explicit Measure.jpg', alt: 'การคำนวณ Implicit VS Explicit Measure บน Power BI' }
  }
];
