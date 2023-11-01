import { LoaderArgs, V2_MetaFunction, json } from '@remix-run/node';
import { useLoaderData, useOutletContext } from '@remix-run/react';
import { PageDataType } from '~/types/page-data';
import { ContainerComponent } from '~/website-themes/dawn/container';
import { ApiResponse } from 'apisauce';
import { apiGateway } from '~/api-config';
import { useEffect, useState } from 'react';

// 
// Loader fetches the page data based on the page id.
// 
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

// Add title and description of the page
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
  // data from loader
  const { pageData } = useLoaderData<typeof loader>();

  // data from the root component which comes from the editor when in editing mode.
  const { page: pageDataFromEditor, inspectorOn } = useOutletContext<{ page: PageDataType, onSelectElement: (id: string) => void, inspectorOn: boolean }>();

  // page's data is set to saved data initially. and will only be updated if page is being edited.
  const [page, setPage] = useState<PageDataType>(JSON.parse(JSON.stringify(pageData)));

  // when page is viewed inside the editor, page data is updated with the latest changes.
  useEffect(() => {
    if (inspectorOn) {
      setPage(pageDataFromEditor)
    }
  }, [pageDataFromEditor]);

  useEffect(() => {
    if (pageData?.id) {
      apiGateway.post(`/analytics`, { event: "PAGE_VIEW", pageId: pageData.id });
    }
  }, [pageData?.id])

  return (
    <>
      {page && page.sections.map((section, index) => (
        // renders the container for a section
        <ContainerComponent data={section.layout} elementId={[index]} key={index} />
      ))}
    </>
  );
}