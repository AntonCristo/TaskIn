import React from "react";
import { observer } from "mobx-react";

type HomeProps = {};

export const Home: React.FC = observer((props: HomeProps) => {
  return <div>Home page</div>;
});
