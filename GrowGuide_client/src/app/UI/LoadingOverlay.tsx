import { Spinner } from "@nextui-org/react";
import React from "react";

const LoadingOverlay = ({ isPending }: { isPending: boolean }) => {
  return (
    <div>
      <div
        className={` ${isPending ? "block" : "hidden"}  overlay z-30 fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center`}
      >
        {isPending && <Spinner size="lg" />}
      </div>
    </div>
  );
};
export default LoadingOverlay;
