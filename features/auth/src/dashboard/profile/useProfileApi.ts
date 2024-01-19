import { Endpoints, useAPIRequest } from '@network';
import { API_METHODS, USER_COUNTRY } from '@types';
import { countryCodes } from '@utils';

export const useProfileApi = (i18n: {t: (s: string) => string}) => {
  const { request, loading, data } = useAPIRequest<{
    name: string;
    username: string;
    phoneNumber: string;
    country: string;
  }>({
    url: Endpoints.PROFILE,
    method: API_METHODS.GET,
  });

  const cards = [
    {
      id: 1,
      title: i18n.t('username') || '-',
      subtitle: data?.username || '-',
    },
    {
      id: 2,
      title: i18n.t('phoneNumber') || '-',
      subtitle:
        (countryCodes?.[data?.country as USER_COUNTRY] || '') +
        data?.phoneNumber || '-',
    },
    {
      id: 3,
      title: i18n.t('country') || '-',
      subtitle: data?.country ? i18n.t('country' + data?.country) : '' || '-',
    },
  ];

  return {
    requestProfile: request,
    loading,
    data,
    cards,
  };
};
