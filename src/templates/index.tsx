import { TutorWebsite } from "../Subdomain";
import Demo1 from "./demo1/App";
import Demo2 from "./demo2/App";
import Demo3 from "./demo3/App";
interface DemoProps {
  website: TutorWebsite;
  subdomain?: string; // ถ้ามี
}
const Demo01 = ({ website }: DemoProps) => {
  return <Demo1 website={website} />;
};

const Demo02 = ({ website }: DemoProps) => {
  return <Demo2 website={website} />;
};
const Demo03 = ({ website }: DemoProps) => {
  return <Demo3 website={website} />;
};

export { Demo01, Demo02, Demo03 };
