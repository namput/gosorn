import { lazy, Suspense } from "react";

// 📌 โหลด Component ตามชื่อ Template ที่ระบุ
const templates: Record<string, any> = {
  demo1: lazy(() => import("../templates/demo1/App").then((mod) => ({ default: mod.default }))),
  demo2: lazy(() => import("../templates/demo2/App").then((mod) => ({ default: mod.default }))),
};

const DynamicTemplate: React.FC<{ template: string }> = ({ template }) => {
  const Component = templates[template];

  return Component ? (
    <Suspense fallback={<p>Loading Template...</p>}>
      <Component />
    </Suspense>
  ) : (
    <p>ไม่พบ Template</p>
  );
};

export default DynamicTemplate;
