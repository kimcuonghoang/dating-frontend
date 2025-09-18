import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Input, Button, DatePicker, Select, Upload, message, Spin } from "antd";
import dayjs from "dayjs";
import { getProfileUser, updateProfileUser } from "../../common/api/userApi";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const ProfileEditPage = () => {
  const userId = localStorage.getItem("userId");
  const nav = useNavigate();
  // Lấy dữ liệu user
  const { data, isLoading } = useQuery({
    queryKey: ["USERS", userId],
    queryFn: () => getProfileUser(userId),
    enabled: !!userId,
  });

  const user = data?.data || data;

  // React Hook Form
  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
        birthday: user.birthday ? dayjs(user.birthday) : null,
        gender: user.gender,
        bio: user.bio,
        interests: user.interests || [],
        photos: user.photos || [],
      });
    }
  }, [user, reset]);

  // Mutation update
  const mutation = useMutation({
    mutationFn: (values: any) => updateProfileUser(userId, values),
    onSuccess: () => {
      message.success("Cập nhật hồ sơ thành công!");
      nav("/profile");
    },
    onError: () => {
      message.error("Cập nhật thất bại!");
    },
  });

  const onSubmit = (values: any) => {
    const payload = {
      ...values,
      birthday: values.birthday ? values.birthday.toISOString() : null,
    };
    mutation.mutate(payload);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-16 px-6 flex justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">
          Chỉnh sửa hồ sơ
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username */}
          <div>
            <label className="font-medium text-gray-700">Tên hiển thị</label>
            <Controller
              name="username"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-medium text-gray-700">Email</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input {...field} disabled />}
            />
          </div>

          {/* Birthday */}
          <div>
            <label className="font-medium text-gray-700">Ngày sinh</label>
            <Controller
              name="birthday"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                  format="YYYY-MM-DD"
                  style={{ width: "100%" }}
                />
              )}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="font-medium text-gray-700">Giới tính</label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select {...field} style={{ width: "100%" }}>
                  <Select.Option value="male">Nam</Select.Option>
                  <Select.Option value="female">Nữ</Select.Option>
                </Select>
              )}
            />
          </div>

          {/* Bio */}
          <div>
            <label className="font-medium text-gray-700">Giới thiệu</label>
            <Controller
              name="bio"
              control={control}
              render={({ field }) => <TextArea rows={3} {...field} />}
            />
          </div>

          {/* Interests */}
          <div>
            <label className="font-medium text-gray-700">Sở thích</label>
            <Controller
              name="interests"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Chọn tối đa 5 sở thích"
                  maxTagCount={5}
                  options={[
                    { label: "Quan tâm", value: "Quan tâm" },
                    { label: "Lắng nghe", value: "Lắng nghe" },
                    { label: "Tin tưởng", value: "Tin tưởng" },
                    { label: "Gần gũi", value: "Gần gũi" },
                    { label: "Đồng hành", value: "Đồng hành" },
                  ]}
                />
              )}
            />
          </div>

          {/* Photos */}
          <div>
            <label className="font-medium text-gray-700">Ảnh</label>
            <Controller
              name="photos"
              control={control}
              render={({ field }) => (
                <Upload
                  listType="picture"
                  multiple
                  defaultFileList={field.value?.map(
                    (url: string, idx: number) => ({
                      uid: idx.toString(),
                      name: `Ảnh ${idx + 1}`,
                      status: "done",
                      url,
                    })
                  )}
                  beforeUpload={() => false} // ngăn auto upload
                  onChange={({ fileList }) => {
                    const urls = fileList.map(
                      (f) => f.url || URL.createObjectURL(f.originFileObj!)
                    );
                    field.onChange(urls);
                  }}
                >
                  <Button icon={<UploadOutlined />}>Thêm ảnh</Button>
                </Upload>
              )}
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="!whitespace-nowrap !cursor-pointer !text-lg !px-8 !py-3 !h-auto !bg-gradient-to-r !from-pink-500 !to-red-500 !border-0 !rounded-2xl"
            >
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditPage;
