import React, { useState, useMemo } from "react";
import {
  Table,
  Pagination,
  Select,
  Tag,
  Input,
  Button,
  Drawer,
  Card,
  Skeleton,
} from "components/ui";
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import { matchSorter } from "match-sorter";
// import EditLead from './EditProduct'
import EditTable from "./EditTable";
import { toast, Notification } from "components/ui";
import { deleteTable } from "services/RestaurantApiServices";

import { AiOutlineFieldNumber } from "react-icons/ai";
import { FaShapes, FaChair } from "react-icons/fa";

const TableList = (props) => {
  const { data, dataLength, refreshData, setRefreshData, id } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState();
  const [editData, setEditData] = useState();

  const openDrawer = (data) => {
    setEditData(JSON.parse(data));
    setIsOpen(true);
  };

  const onDrawerClose = () => {
    setEditId();
    setIsOpen(false);
  };

  const editLead = (e) => {
    openDrawer(e.target.getAttribute("data-details"));
  };

  const deleteRow = async (id) => {
    const resp = await deleteTable(id);
    if (resp.data) {
      if (resp.data.response === "success") {
        toast.push(<Notification title={resp.data.message} type="success" />, {
          placement: "top-center",
        });
        setTimeout(() => {
          setRefreshData(!refreshData);
        }, 500);
      } else if (resp.data.response === "warning") {
        toast.push(<Notification title={resp.data.message} type="success" />, {
          placement: "top-center",
        });
      }
    }
  };

  const downloadQr = (qr_url, filename) => {
    const link = document.createElement("a");
    link.href = qr_url;
    link.download = filename;
    link.click();
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {data.map((item, key) => {
          return [
            <Card
              key={key}
              clickable
              className="hover:shadow-lg transition duration-150 ease-in-out  dark:border dark:border-gray-600 dark:border-solid flex justify-center items-center mb-2"
              headerClass="p-0"
            >
              <div className="rounded-tl-lg rounded-tr-lg overflow-hidden ">
                <h4 className="font-bold text-center mb-2">
                  Table {item.table_no}
                </h4>
                <img src={item.qr_code} alt="image" width={300}/>
              </div>

              <div className="ml-3 text-gray-800 dark:text-gray-200 mt-2 mb-2">
                <div className="col">
                  {/* <div class="ml-5 flex items-center font-bold text-gray-700">
                    <AiOutlineFieldNumber />
                    <span class="font-bold">
                      &nbsp; Table No - {item.table_no}
                    </span>
                  </div> */}
                  <div class="ml-5 flex items-center font-bold ">
                    <FaShapes />
                    <span class="">
                      &nbsp; Type - {item.table_type}
                    </span>
                  </div>
                  <div class="ml-5 flex items-center font-bold">
                    <FaChair />
                    <span class="">
                      &nbsp; Chairs - {item.seat_count}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center items-center mt-5">
                <span className="text-center">
                  <Button
                    className="mr-2 mb-2"
                    size="xs"
                    variant="solid"
                    color="gray-600"
                    onClick={() =>
                      downloadQr(
                        item.qr_code,
                        `QR Code - Table ${item.table_no}`
                      )
                    }
                  >
                    {" "}
                    Download{" "}
                  </Button>

                  <Button
                    className="mr-2 mb-2"
                    size="xs"
                    variant="solid"
                    color="gray-600"
                    id={item.id}
                    data-details={JSON.stringify(item)}
                    onClick={editLead}
                  >
                    {" "}
                    Edit{" "}
                  </Button>

                  <Button
                    size="xs"
                    variant="solid"
                    color="red-800"
                    onClick={() => deleteRow(item.id)}
                  >
                    {" "}
                    Delete{" "}
                  </Button>
                </span>
              </div>
            </Card>
          ];
        })}
      </div>

      {
        <Drawer
          title="Edit Table"
          isOpen={isOpen}
          onClose={onDrawerClose}
          onRequestClose={onDrawerClose}
          // footer={Footer}
        >
          <EditTable data={editData} id={id} refreshData={refreshData} setRefreshData={setRefreshData} />
        </Drawer>
      }
    </div>
  );
};

export default TableList;
