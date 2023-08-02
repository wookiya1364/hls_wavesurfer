"use client";

export default function UiTemplate() {
  return (
    <main className='flex w-full justify-center items-center h-screen'>
      <button onClick={e => alert("CLICK")} className='w-10 h-10 bg-red-600'>
        버튼
      </button>
    </main>
  );
}
