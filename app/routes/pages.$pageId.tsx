import { LoaderArgs, V2_MetaFunction, json } from '@remix-run/node';
import { useLoaderData, useOutletContext } from '@remix-run/react';
import { PageDataType } from '~/types/page-data';
import { ContainerComponent } from '~/website-themes/dawn/container';
import { ApiResponse } from 'apisauce';
import { apiGateway } from '~/api-config';
import { useEffect, useState } from 'react';

export const loader = async ({ request, params }: LoaderArgs) => {
  const { pageId } = params;
  const promises: [
    Promise<ApiResponse<PageDataType>>,
  ] = [
      apiGateway.get<PageDataType>(`/pages/${pageId}`)
    ];
  const [_pageResponse] = await Promise.all(promises);
  if (!_pageResponse.ok) throw new Error(JSON.stringify(_pageResponse.data));

  return json({
    pageData: _pageResponse.data
  });
};

export const meta: V2_MetaFunction<typeof loader> = ({
  data
}) => {
  return [
    {
      charset: "utf-8",
      title: data?.pageData?.name,
    },
    {
      name: "viewport",
      content: "width=device-width,initial-scale=1",
    },
    {
      name: 'description',
      content: data?.pageData?.description,
    },
  ]
};

export default function Index() {
  const { pageData } = useLoaderData<typeof loader>();
  const { page: pageDataFromEditor, inspectorOn } = useOutletContext<{ page: PageDataType, onSelectElement: (id: string) => void, inspectorOn: boolean }>();
  const [page, setPage] = useState<PageDataType>(JSON.parse(JSON.stringify(pageData)));

  useEffect(() => {
    if (inspectorOn) {
      setPage(pageDataFromEditor)
    }
  }, [pageDataFromEditor]);

  return (
    <>
      {page && page.sections.map((section, index) => (
        <ContainerComponent data={section.layout} elementId={[index]} key={index} />
      ))}
    </>
  );
}