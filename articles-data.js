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
    id: 'excel-lambda-functions',
    href: 'excel-lambda-functions.html',
    category: 'Excel',
    title: 'ฟังก์ชัน LAMBDA ใน Excel: สร้างสูตรของคุณเองได้',
    description: 'วิธีเปลี่ยนสูตรยาวๆ ที่ต้องพิมพ์ซ้ำ ให้กลายเป็นฟังก์ชันที่ตั้งชื่อเองและนำกลับมาใช้ใหม่ได้ โดยไม่ต้องพึ่ง VBA',
    author: 'Data Reinvent Team',
    readTime: 'อ่าน 7 นาที',
    thumbnail: { type: 'lambda', colors: ['#1f7a4d', '#2b4dfa'] }
  },
  {
    id: 'power-bi-dashboard-design',
    href: 'power-bi-dashboard-design.html',
    category: 'Power BI',
    title: 'ออกแบบแดชบอร์ด Power BI ที่คนเปิดดูจริง',
    description: 'พฤติกรรมด้านการจัดโครงสร้างข้อมูลและการจัดวางหน้าตา ที่แยกแดชบอร์ดที่คนเปิดดูทุกวัน ออกจากแดชบอร์ดที่ถูกมองข้าม',
    author: 'Data Reinvent Team',
    readTime: 'อ่าน 8 นาที',
    thumbnail: { type: 'bars', colors: ['#e6399f', '#7b2ff7'] }
  },
  {
    id: 'microsoft-copilot-for-business',
    href: 'microsoft-copilot-for-business.html',
    category: 'Copilot',
    title: 'ดึงประสิทธิภาพที่แท้จริงจาก Microsoft Copilot',
    description: 'ทำไมการนำ Copilot มาใช้ส่วนใหญ่ถึงหยุดอยู่แค่ความอยากรู้อยากเห็น และแนวทางแบ่งตามบทบาทหน้าที่ที่ช่วยให้ทีมงานใช้งานจริงทุกวัน',
    author: 'Data Reinvent Team',
    readTime: 'อ่าน 6 นาที',
    thumbnail: { type: 'sparkle', colors: ['#2b4dfa', '#e6399f'] }
  },
  {
    id: 'esg-analytics-with-excel',
    href: 'esg-analytics-with-excel.html',
    category: 'ESG Analytics',
    title: 'สร้างโมเดลรายงาน ESG ใน Excel ก่อนขยายผล',
    description: 'วิธีรวบรวมข้อมูล ESG ใน Excel อย่างเป็นระบบและตรวจสอบย้อนกลับได้ — ก่อนหรือควบคู่ไปกับการย้ายไปใช้ Power BI',
    author: 'Data Reinvent Team',
    readTime: 'อ่าน 7 นาที',
    thumbnail: { type: 'leaf', colors: ['#ff7a3d', '#1f7a4d'] }
  },
  {
    id: 'excel-variance-number-formatting',
    href: 'excel-variance-number-formatting.html',
    category: 'Excel',
    title: 'จัดรูปแบบตัวเลขผลต่างให้ "อ่านเข้าใจได้เอง" ภายในไม่กี่วินาที',
    description: 'เทคนิคผสาน TEXT กับ CONCATENATE ที่เปลี่ยนตัวเลขเทียบปีต่อปีดิบๆ ให้กลายเป็นป้ายตัวเลขพร้อมใช้งานในรายงาน โดยไม่ต้องมานั่งพิมพ์คอมม่าทีละแถว',
    author: 'Data Reinvent Team',
    readTime: 'อ่าน 5 นาที',
    thumbnail: { type: 'image', src: 'Format Number.PNG', alt: 'ตัวอย่างการจัดรูปแบบตัวเลขความแปรปรวนใน Excel' }
  }
];
