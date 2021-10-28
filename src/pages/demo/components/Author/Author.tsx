import NextImage from 'next/image';

import { Demo } from 'types/demo';

export interface AuthorProps {
  meta: Demo['meta'];
}

function Author({ meta }: AuthorProps) {
  return (
    <div
      className="
        tw-flex
      "
    >
      <NextImage
        src={`https://unavatar.io/${
          meta.author.social.twitter || meta.author.social.github
        }`}
        alt={meta.author.name}
        width={80}
        height={80}
        className="tw-rounded-2xl"
      />
      <div
        className="
          tw-flex
          tw-flex-col
          tw-justify-center
          tw-ml-4
        "
      >
        <h5
          className="
          tw-text-xl
          tw-font-bold
        "
        >
          {meta.author.name}
        </h5>
        <a
          href={`https://twitter.com/${meta.author.social.twitter}`}
          className="tw-text-sm tw-text-gray-500"
        >
          @{meta.author.social.twitter}
        </a>
      </div>
    </div>
  );
}

export default Author;
