'use client'

import React from "react";
import Button from "../button";
import Link from "next/link";
// import { Url } from "url";

interface ButtonConfig {
  label: string;
  onClick: (id: string) => void;
  href?: string;
  className?: string;
}

interface Props {
  header: string[];
  data: Record<string, string>[];
  buttonConfig?: ButtonConfig[];
}
const Table:React.FC<Props> = ({header, data, buttonConfig}) => {
  // const [filteredData, setFilteredData] = React.useState(data);
  
  // React.useEffect(() => {
  //   if(data.length>0){
  //     const temp = data.map(item =>
  //       header.reduce((filteredItem, field) => {
  //         // Pengecekan apakah properti ada di objek
  //         if(item.hasOwnProperty(field)){
  //           filteredItem[field] = item[field];
  //         }          
  //         return filteredItem;
  //       }, {} as Record<string, string>)
  //     );
  //     setFilteredData(temp);
  //   }
  // }, [data, header]);
  
  return (
    <div className="relative overflow-x-auto">      
      <table className="w-full table-auto min-w-max text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
          {header.map((item, index) => (
              item !== 'id' && ( // Jangan tampilkan kolom 'id'
                <th scope="col" className="px-6 py-3" key={index}>
                  {item.toUpperCase()}
                </th>
              )
            ))}        
            { buttonConfig && buttonConfig.length > 0 && (
              <th scope="col" className="px-6 py-3 text-center">Aksi</th>
            )}  
          </tr>            
        </thead>
        <tbody>
          {data.length === 0 && <tr><td className="text-center px-6 py-4" colSpan={header.length}>no record found</td></tr>}
          {data.map((item, index) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
              {header.map((field, idx) => (
                field !== 'id' && ( 
                  <td className="px-6 py-4" key={idx}>
                    {item[field as keyof typeof item]}
                  </td>
                )
              ))}             
              { buttonConfig && buttonConfig.length > 0 && (
                <td className="px-2 py-4">
                  <div className="flex items-center justify-center flex-wrap">
                    { buttonConfig.filter(button=> button.label==='Edit').map((button, index) => (
                      <Link key={index} className={`${button.className} px-4 py-2 m-2 rounded`} 
                        href={`${button.href}/${item.id}`} 
                        >
                        {button.label}
                      </Link>
                    ))}
                    { buttonConfig.filter(button=> button.label==='Delete' || button.label ==='Details').map((button, index) => (
                      <Button key={index} className={`${button.className} btn-del-${item.id}`} 
                        onClick={() => button.onClick(item.id)}>
                        {button.label}
                      </Button>                    
                    ))}
                    
                  {/* {buttonConfig.map((button, index) => (
                    button.label==='Delete' || button.label ==='Details' &&
                    <Button key={index} className={button.className} 
                      onClick={() => button.onClick(item.id)}>
                      {button.label}
                    </Button>                    
                  ))} */}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>    
    </div>
  );
};

export default Table;
