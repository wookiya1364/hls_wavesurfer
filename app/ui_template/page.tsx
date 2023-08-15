"use client";

import { Button } from "../@component/ui/button";

export default function UiTemplate() {
  return (
    <main className='flex w-full justify-center items-center h-screen'>
      <Button intent={"red"} size={"sm"} className='text-orange-400'>
        버튼
      </Button>
      <Button intent={"blue"} size={"sm"} className='text-orange-400'>
        버튼
      </Button>
    </main>
  );
}
