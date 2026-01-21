import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, List, Text } from "zmp-ui";
import { copy } from "@/constants/copy";
import SearchBar from "@/components/common/search-bar";
import { MapPinIcon, MapPinIconSolid } from "@/components/common/vectors";

interface Location {
  id: string;
  name: string;
  address: string;
  distance: string;
}

export default function SelectLocationPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const locations: Location[] = [
    {
      id: "1",
      name: "KDC Jamona - Art Gallery",
      address: "02-03a KCN trong KCX, Tân Thuận Đông",
      distance: "6,7km",
    },
    {
      id: "2",
      name: "CÔNG TY TNHH KDC Jamona",
      address: "504 Huỳnh Tấn Phát, Bình Thuận, Quận 7, Hồ Chí Minh",
      distance: "12,2km",
    },
    {
      id: "3",
      name: "KDC Jamona Vietnam",
      address: "Đường Số 5, Khu đô thị Him Lam, Quận 7, Hồ Chí Minh",
      distance: "18,5km",
    },
  ];

  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.address.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelectLocation = (location: Location) => {
    navigate(-1);
  };

  return (
    <div className="header-margin flex h-full flex-col gap-2 bg-background">
      <div className="px-4 pb-3 pt-4">
        <div className="relative w-full">
          <input
            className={`placeholder:text-inactive h-10 w-full max-w-[70%] rounded-lg bg-neutral100 pl-10 text-large outline-none`}
            placeholder="Tìm kiếm địa điểm"
          />
          <MapPinIcon className="absolute left-3 top-1/2 size-5 -translate-y-1/2" />
        </div>
      </div>
      <div className="flex items-center justify-between px-4">
        <div className="text-small text-text-secondary">
          {copy.selectLocation.nearestTitle}
        </div>
        <div className="text-small text-primary">
          {filteredLocations.length} {copy.common.resultCountSuffix}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredLocations.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="mb-2 h-16 w-16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <Text size="xSmall">{copy.selectLocation.notFound}</Text>
          </div>
        ) : (
          <div className="flex flex-col gap-5 p-4">
            {filteredLocations.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSelectLocation(item)}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2">
                  <div>
                    <MapPinIconSolid />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="text-base font-medium text-text-primary">
                      {item.name}
                    </div>
                    <div
                      className="text-xxsmall text-text-secondary"
                      style={{ lineHeight: "16px" }}
                    >
                      {item.address}
                    </div>
                  </div>
                </div>
                <div className="font-medium text-text-primary">
                  {item.distance}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
