function Button() {
  return (
    <div className="h-[48px] relative rounded-[8px] shrink-0 w-[94.367px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#99a1af] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[48px] relative w-[94.367px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[47px] not-italic text-[#99a1af] text-[16px] text-center text-nowrap top-[12px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Anuluj</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[68.02px] size-[16px] top-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-gradient-to-b from-[#00b67a] h-[48px] relative rounded-[8px] shrink-0 to-[#00a066] w-[108.023px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[48px] relative w-[108.023px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[42.5px] not-italic text-[16px] text-center text-nowrap text-white top-[11.5px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Dalej</p>
        <Icon />
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex items-center justify-between relative size-full" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}