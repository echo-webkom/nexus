import Image from "next/image";
import Link from "next/link";
import { LuBriefcase, LuCalendarClock, LuCoffee, LuPin } from "react-icons/lu";

import { type JobAdsQueryResult } from "@echo-webkom/cms/types";
import { urlFor } from "@echo-webkom/sanity";

import { jobTypeString } from "@/sanity/utils/mappers";
import { cn } from "@/utils/cn";
import { shortDateNoTime } from "@/utils/date";

type JobAdPreviewProps = {
  jobAd: JobAdsQueryResult[number];
  hideBorder?: boolean;
};

export const JobAdPreview = ({ jobAd, hideBorder = false }: JobAdPreviewProps) => {
  return (
    <Link href={`/for-studenter/stillingsannonse/${jobAd.slug}`}>
      <div
        className={cn(
          "flex h-48 flex-row items-center gap-8 rounded-xl border-2 p-6",
          "hover:bg-muted",
          "transition-colors duration-200 ease-in-out",
          {
            "border-transparent hover:border-border": !hideBorder,
            "border-border": hideBorder,
          },
        )}
      >
        <div className="hidden sm:block">
          <div className="relative h-28 w-28 overflow-hidden rounded-full border-2 bg-white">
            <Image
              src={urlFor(jobAd.company.image).url()}
              alt={`${jobAd.company.name} logo`}
              fill
            />
          </div>
        </div>
        <div className="flex h-full w-full flex-col gap-1 overflow-x-hidden">
          <h3 className="mb-4 line-clamp-2 text-lg font-semibold md:text-xl">{jobAd.title}</h3>
          <ul className="flex flex-wrap gap-3">
            <li className="flex items-center gap-2">
              <LuBriefcase className="h-4 w-4 text-yellow-800" /> {jobAd.company.name}
            </li>
            <li className="flex items-center gap-2">
              <LuPin className="h-4 w-4 text-red-600" />{" "}
              {jobAd.locations.map((location) => location.name).join(", ")}
            </li>
            <li className="flex items-center gap-2">
              <LuCalendarClock className="h-4 w-4 text-stone-700 dark:text-stone-400" />{" "}
              {shortDateNoTime(jobAd.deadline)}
            </li>
            <li className="flex items-center gap-2">
              <LuCoffee className="h-4 w-4 text-amber-900" /> {jobTypeString(jobAd.jobType)}
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
};
