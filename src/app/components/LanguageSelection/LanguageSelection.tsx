'use client';

import React, { useState } from 'react';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import ReactCountryFlag from 'react-country-flag';

import { useParams, usePathname, useRouter } from 'next/navigation';

import 'bootstrap/dist/css/bootstrap.css';
import'./LanguageSelection.scss';

import { localeLabelByCode } from '@/app/constants/locale.constants';
import { CountryCode, LocaleCode } from '@/app/enum/locale.enum';
import { LanguageSelectionOption } from '@/app/interfaces/locale.interfaces';
import { getLanguageSelectionOptionLabel } from '@/app/helpers/locale.helpers';

const options: LanguageSelectionOption[] = [
  {
    value: LocaleCode.EN,
    label: <ReactCountryFlag countryCode={CountryCode.US} svg />,
  },
  {
    value: LocaleCode.ES,
    label: <ReactCountryFlag countryCode={CountryCode.ES} svg />,
  },
];

export default function LanguageSelection() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const [label, setLabel] = useState(getLanguageSelectionOptionLabel(options, params?.locale as string));

  const onLanguageSelect = (selectedOption: LanguageSelectionOption): void => {
    setLabel(selectedOption.label);

    router.replace(`/${selectedOption.value}/${pathname?.slice(4)}`);
  };

  return (
    <div className="language-selection">
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle className="language-selection__toggle">
          {label}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {
            options.map((option, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => onLanguageSelect(option)}
              >
                {localeLabelByCode[option.value]}
              </Dropdown.Item>
            ))
          }
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
