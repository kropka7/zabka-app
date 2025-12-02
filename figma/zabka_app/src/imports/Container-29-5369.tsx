function Icon() {
  return (
    <div className="relative size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function BackButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group h-[48px] relative rounded-[8px] shrink-0 w-[108.023px] transition-all hover:bg-[#212121]/10 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B67A] focus-visible:ring-offset-2"
      data-name="Button"
    >
      <div className="absolute border border-[#555555] group-active:border-[#212121] dark:border-[#99a1af] dark:group-active:border-white border-solid inset-0 pointer-events-none rounded-[8px] transition-colors" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[48px] relative w-[108.023px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[63.84px] not-italic text-[16px] text-center text-nowrap text-[#555555] group-active:text-[#212121] dark:text-[#99a1af] dark:group-active:text-white top-[12px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre transition-colors">
          Wstecz
        </p>
        <div className="absolute flex items-center justify-center left-[9.34px] size-[16px] top-[16px] text-[#555555] group-active:text-[#212121] dark:text-[#99a1af] dark:group-active:text-white transition-colors">
          <div className="flex-none rotate-[180deg] scale-y-[-100%]">
            <Icon />
          </div>
        </div>
      </div>
    </button>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[68.02px] size-[16px] top-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function NextButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-b from-[#00b67a] h-[48px] relative rounded-[8px] shrink-0 to-[#00a066] w-[108.023px] transition-all hover:shadow-lg hover:shadow-[#00b67a]/20 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00B67A] focus-visible:ring-offset-2"
      data-name="Button"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[48px] relative w-[108.023px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[42.5px] not-italic text-[16px] text-center text-nowrap text-white top-[11.5px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">
          Dalej
        </p>
        <Icon1 />
      </div>
    </button>
  );
}

export default function Container({ onBack, onNext }: { onBack?: () => void; onNext?: () => void }) {
  return (
    <div className="content-stretch flex items-center justify-between relative size-full" data-name="Container">
      <BackButton onClick={onBack} />
      <NextButton onClick={onNext} />
    </div>
  );
}
