import React, { useState, useEffect, useMemo } from "react";
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
import EditAddon from "./EditAddon";
import { toast, Notification } from "components/ui";
import { deleteAddon } from "services/RestaurantApiServices";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { FaShapes, FaChair } from "react-icons/fa";
import RenderImage from "./RenderImage";
const { Tr, Th, Td, THead, TBody } = Table;

const ProductList = (props) => {
  const { data, dataLength, refresh, setRefresh, id } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState();
  const [editData, setEditData] = useState();

  const [searchTerm, setSearchTerm] = useState("");

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
    const resp = await deleteAddon(id);
    if (resp.data) {
      if (resp.data.response === "success") {
        toast.push(<Notification title={resp.data.message} type="success" />, {
          placement: "top-center",
        });
        setTimeout(() => {
          setRefresh(true);
        }, 500);
      } else if (resp.data.response === "warning") {
        toast.push(<Notification title={resp.data.message} type="success" />, {
          placement: "top-center",
        });
      }
    }
  };

  const filteredProducts = data.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Search */}
      <div className="flex justify-start">
        <div className="flex items-center mb-4">
          <Input
            size="sm"
            className="mb-2"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            style={{ maxWidth: 180 }}
            placeholder={`Search Addon`}
          />
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800">
        {filteredProducts.length === 0 && "No products found!"}
        <Table>
          <THead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Price</Th>
              <Th className="flex justify-center">Action</Th>
            </Tr>
          </THead>
          <TBody>
            {filteredProducts.map((item, key) => {
              return [
                <Tr key={key}>
                  <Td>{key+1}</Td>
                  <Td>{item.name}</Td>
                  <Td>€ {item.price}</Td>
                  <Td className="flex justify-center">
                    <div className="flex justify-center items-center mt-5">
                      <span className="text-center">
                        <Button
                          className="mr-2 mb-2 px-5"
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
                          className="bg-primary"
                          size="xs"
                          variant="solid"
                          // color="red-900"
                          onClick={() => deleteRow(item.id)}
                        >
                          {" "}
                          Delete{" "}
                        </Button>
                      </span>
                    </div>
                  </Td>
                </Tr>,
                // <Card
                //   key={key}
                //   clickable
                //   className="hover:shadow-lg transition duration-150 ease-in-out   dark:border dark:border-gray-600 dark:border-solid flex justify-center items-center mb-2"
                //   headerClass="p-0"
                // >

                //   <div className="col">
                //     <h5 class="flex justify-center items-center ">
                //       <b>{item.name}</b>
                //     </h5>
                //     <div class="flex justify-center items-center">
                //       {item.description}
                //     </div>
                //     <h6 class="flex justify-center items-center">
                //       <Tag
                //         size={20}
                //         className="bg-green-600 text-white dark:bg-green-600 border-0 rounded mt-2 text-xs"
                //       >
                //         <b>€ {item.price}</b>
                //       </Tag>
                //     </h6>
                //   </div>

                //   <div className="flex justify-center items-center mt-5">
                //     <span className="text-center">
                //       <Button
                //         className="mr-2 mb-2 px-5"
                //         size="sm"
                //         variant="solid"
                //         color="gray-600"
                //         id={item.id}
                //         data-details={JSON.stringify(item)}
                //         onClick={editLead}
                //       >
                //         {" "}
                //         Edit{" "}
                //       </Button>

                //       <Button
                //         size="sm"
                //         variant="solid"
                //         color="red-900"
                //         onClick={() => deleteRow(item.id)}
                //       >
                //         {" "}
                //         Delete{" "}
                //       </Button>
                //     </span>
                //   </div>
                // </Card>,
              ];
            })}
          </TBody>
        </Table>
      </div>

      {
        <Drawer
          title="Edit Product"
          isOpen={isOpen}
          onClose={onDrawerClose}
          onRequestClose={onDrawerClose}
          // footer={Footer}
        >
          <EditAddon
            data={editData}
            id={id}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </Drawer>
      }
    </div>
  );
};

export default ProductList;
