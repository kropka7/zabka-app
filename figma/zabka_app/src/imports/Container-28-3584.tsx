import svgPaths from "./svg-fg260nte7g";

function Text() {
  return (
    <div className="h-[24px] relative rounded-[8px] shrink-0 w-[46.367px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[46.367px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[23.5px] not-italic text-[#d1d5dc] text-[16px] text-center text-nowrap top-[-0.5px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Anuluj</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[48px] relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#99a1af] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[48px] items-center justify-center px-[25px] py-px relative">
        <Text />
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path d={svgPaths.p35f49000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[54.17%_29.17%_12.5%_29.17%]" data-name="Vector">
        <div className="absolute inset-[-12.5%_-10%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 7">
            <path d={svgPaths.p4a5180} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_37.5%_66.67%_29.17%]" data-name="Vector">
        <div className="absolute inset-[-20%_-12.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 5">
            <path d={svgPaths.pf21b00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[91.461px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[91.461px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[46.5px] not-italic text-[16px] text-center text-nowrap text-white top-[-0.5px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Zapisz szkic</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[rgba(74,85,101,0.5)] content-stretch flex gap-[8px] h-[48px] items-center justify-center relative rounded-[8px] shrink-0 w-[163.461px]" data-name="Button">
      <Text1 />
      <Text2 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[8.33%_8.33%_8.33%_12.5%]" data-name="Group">
      <div className="absolute inset-[-4.99%_-5.25%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 15">
          <g id="Group">
            <path d={svgPaths.p570f3c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
            <path d={svgPaths.p10a09000} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function LucideCalendarClock() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="lucide:calendar-clock">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border overflow-clip relative rounded-[inherit] size-[16px]">
        <Group />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[24px] relative shrink-0 w-[143.031px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[143.031px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[72px] not-italic text-[16px] text-center text-nowrap text-white top-[-0.5px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Zaplanuj publikację</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[rgba(152,16,250,0.5)] content-stretch flex gap-[8px] h-[48px] items-center justify-center relative rounded-[8px] shrink-0 w-[215.031px]" data-name="Button">
      <LucideCalendarClock />
      <Text3 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.32%_8.32%_8.33%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
            <path d={svgPaths.p185227c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[8.95%_8.94%_45.48%_45.48%]" data-name="Vector">
        <div className="absolute inset-[-9.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
            <path d={svgPaths.p2db0e900} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[16px]">
        <Icon1 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[24px] relative shrink-0 w-[146.063px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[146.063px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[73px] not-italic text-[16px] text-center text-nowrap text-white top-[-0.5px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Wyślij do akceptacji</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-gradient-to-b content-stretch flex from-[#10b981] gap-[8px] h-[48px] items-center justify-center relative rounded-[8px] shrink-0 to-[#059669] w-[216.063px]" data-name="Button">
      <Text4 />
      <Text5 />
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] items-center relative">
        <Button1 />
        <Button2 />
        <Button3 />
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex items-center justify-between relative size-full" data-name="Container">
      <Button />
      <Frame />
    </div>
  );
}