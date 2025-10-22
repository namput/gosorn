// Layout.tsx
import { Helmet } from "react-helmet-async";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>

  <Helmet>
        <title>Guson - กูสอน แพลตฟอร์มสำหรับติวเตอร์และนักเรียน</title>
        <meta name="description" content="Guson แพลตฟอร์มกูสอน ช่วยติวเตอร์สร้างเว็บไซต์ของตัวเองได้ง่าย เพิ่มโอกาสหานักเรียนและบริหารคอร์สเรียนออนไลน์ สมัครสมาชิกฟรี!" />
        <meta name="keywords" content="Guson, ติวเตอร์, สมัครติวเตอร์, หานักเรียน, คอร์สออนไลน์, ติวเตอร์ออนไลน์, bestkru, เว็บสอนพิเศษ, กูสอน" />

        <link rel="canonical" href="https://guson.in.th" />
        <meta name="language" content="Thai" />
        <meta name="author" content="aekkachai Chatpanglurlurt เอกชัย ฉัตรพงศ์เลอเลิศ" />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Guson - แพลตฟอร์มสำหรับติวเตอร์" />
        <meta property="og:description" content="สมัครใช้งานฟรี! สร้างเว็บไซต์สำหรับติวเตอร์ เพิ่มโอกาสหานักเรียนและบริหารคอร์สออนไลน์" />
        <meta property="og:image" content="https://guson.in.th/images/og-image.jpg" />
        <meta property="og:url" content="https://guson.in.th" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Guson" />
        <meta property="og:locale" content="th_TH" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Guson - แพลตฟอร์มสำหรับติวเตอร์" />
        <meta name="twitter:description" content="ติวเตอร์สามารถสร้างเว็บไซต์ของตัวเองและเข้าถึงนักเรียนได้ง่าย" />
        <meta name="twitter:image" content="https://guson.in.th/images/twitter-image.jpg" />


      </Helmet>
      {children}
    </>
  );
}
