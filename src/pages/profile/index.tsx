import { Avatar, List, Text, useSnackbar } from "zmp-ui";
import { copy } from "@/constants/copy";
import {
  ChevronRightIcon,
  ProfileUserIcon,
  VoucherIcon,
} from "@/components/common/vectors";

interface MenuItem {
  id: string;
  label: string;
  icon: JSX.Element;
  path: string;
}

export default function ProfilePage() {
  const { openSnackbar } = useSnackbar();

  const menuItems: MenuItem[] = [
    {
      id: "1",
      label: copy.profile.personalProfile,
      icon: <ProfileUserIcon className="h-6 w-6" />,
      path: "/profile/personal-info",
    },
    {
      id: "2",
      label: copy.profile.vouchers,
      icon: <VoucherIcon className="h-6 w-6" />,
      path: "/profile/vouchers",
    },
    {
      id: "3",
      label: copy.profile.supportCenter,
      icon: <ProfileUserIcon className="h-6 w-6" />,
      path: "/profile/help",
    },
  ];

  const handleMenuClick = () => {
    openSnackbar({
      text: copy.profile.featureDeveloping,
      type: "warning",
    });
  };

  return (
    <div className="flex h-full flex-col bg-elevation-01">
      <div className="px-4 py-4">
        <div className="flex flex-col items-center">
          <Avatar
            src="https://h5.zadn.vn/static/images/avatar.png"
            size={80}
            className="mb-4"
          />
          <div className="text-xlarge-m text-text-primary">
            {copy.profile.sampleName}
          </div>
        </div>
      </div>

      <div className="mx-3.5 mt-3 flex flex-col gap-6 rounded-lg bg-white p-5">
        {menuItems.map((item: MenuItem) => {
          return (
            <div
              className="flex items-center justify-between"
              onClick={handleMenuClick}
              key={item.id}
            >
              <div className="flex items-center gap-2 text-small">
                <div>{item.icon}</div>
                <div>{item.label}</div>
              </div>
              <ChevronRightIcon className="h-4 w-4 text-text-disabled" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
