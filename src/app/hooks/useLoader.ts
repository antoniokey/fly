import { useContext } from 'react';

import { LoaderContext } from '../providers/LoaderProvider';

export const useLoader = () => useContext(LoaderContext);
