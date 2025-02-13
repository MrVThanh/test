"use client"

import { Book, Calendar, CalendarX, DollarSign, Home, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import MachineHomeBtn from "../../_components/machine-home-btn"

enum EReaderTab {
  BOOKING = "booking",
  UNAVAILABLE_BORROW = "unavailable-borrow",
  BORROWING = "borrowing",
  OVERDUE = "overdue",
  REQUEST = "request",
  PENALTY = "penalty",
}

const userReaderInfo = {
  id: "RD123456",
  name: "Đoàn Viết Thanh",
  type: "Sinh viên",
  dob: "01/01/2000",
  address: "123 Đường 12, Tam Bình, TP.Thủ Đức",
  borrowed: 3,
  overdue: 1,
  penalty: "50.000đ",
}

const MachineReaderPreview = () => {
  return (
    <div className="flex size-full flex-col gap-4">
      <div className="flex flex-1 flex-col gap-2 rounded-lg bg-background p-6">
        <MachineHomeBtn />
        <div className="flex flex-1 flex-col items-start justify-start gap-2">
          <div className="flex w-full flex-1 items-start justify-between gap-4">
            {/* Thông tin người đọc */}
            <Card className="flex h-auto w-1/4 flex-col items-center gap-4 rounded-lg border p-6 shadow-lg">
              {/* Avatar */}
              <Avatar className="size-24 border-2 shadow-md">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <Separator className="h-1 w-full rounded-lg" />

              <div className="w-full space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="size-5" color="blue" />
                    <span className="font-medium">{userReaderInfo.name}</span>
                  </div>
                  <Badge variant="success">{userReaderInfo.type}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="size-5" color="indigo" />
                  <span>Ngày sinh: {userReaderInfo.dob}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Home className="size-5" color="gray" />
                  <span>{userReaderInfo.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Book className="size-5" color="orange" />
                  <span>Đang mượn: {userReaderInfo.borrowed} tài liệu</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarX className="size-5" color="red" />
                  <span>Quá hạn: {userReaderInfo.overdue} tài liệu</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="size-5" color="purple" />
                  <span>Tiền phạt: {userReaderInfo.penalty}</span>
                </div>
              </div>
            </Card>

            {/* Tabs */}
            <div className="flex-1">
              <Tabs
                defaultValue={EReaderTab.BOOKING}
                className="w-full rounded-lg border bg-primary-foreground p-4 shadow-lg"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger
                    className="w-full text-left"
                    value={EReaderTab.BOOKING}
                  >
                    Đặt mượn
                  </TabsTrigger>
                  <TabsTrigger
                    className="w-full text-left"
                    value={EReaderTab.UNAVAILABLE_BORROW}
                  >
                    Tài liệu đặt mượn không có sẵn
                  </TabsTrigger>
                  <TabsTrigger
                    className="w-full text-left"
                    value={EReaderTab.BORROWING}
                  >
                    Tài liệu đang mượn
                  </TabsTrigger>
                  <TabsTrigger
                    className="w-full text-left"
                    value={EReaderTab.OVERDUE}
                  >
                    Tài liệu quá hạn
                  </TabsTrigger>
                  <TabsTrigger
                    className="w-full text-left"
                    value={EReaderTab.REQUEST}
                  >
                    Tài liệu được yêu cầu trả lại
                  </TabsTrigger>
                  <TabsTrigger
                    className="w-full text-left"
                    value={EReaderTab.PENALTY}
                  >
                    Tài liệu bị phạt
                  </TabsTrigger>
                </TabsList>
                <TabsContent value={EReaderTab.BOOKING}>........</TabsContent>
                <TabsContent value={EReaderTab.UNAVAILABLE_BORROW}>
                  ........
                </TabsContent>
                <TabsContent value={EReaderTab.BORROWING}>........</TabsContent>
                <TabsContent value={EReaderTab.OVERDUE}>........</TabsContent>
                <TabsContent value={EReaderTab.REQUEST}>........</TabsContent>
                <TabsContent value={EReaderTab.PENALTY}>........</TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MachineReaderPreview
