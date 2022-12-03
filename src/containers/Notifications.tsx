// Copyright 2020-2021 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
  useNotificationState,
  NotificationGroup,
} from "amazon-chime-sdk-component-library-react";

const Notifications = () => {
  const { notifications } = useNotificationState();
  console.log("notifications", notifications);
  return notifications.length ? <NotificationGroup /> : null;
  // return notifications;
};

export default Notifications;
