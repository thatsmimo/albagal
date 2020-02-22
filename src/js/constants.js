export const colors = {
  blueAsTheme: '#0a698f',
  black: '#00000',
  white: '#ffffff',
};

export const assets = {
  logo: require('../../assets/logo.png'),
};

export const language = {
  'Order': 'طلب',
  'Change Language': 'تغيير اللغة',
  'Logout': 'تسجيل خروج',
  'Order Id': 'رقم التعريف الخاص بالطلب',
  'Item': 'بند',
  'Status': 'الحالة',
  'Pending': 'قيد الانتظار',
  'Delivery Date': 'تاريخ التسليم او الوصول',
  'Price': 'السعر',
  'Status pending': 'الحالة: قيد الإنتظار',
  'Change Status': 'تغيير الوضع',
  'Customer': 'زبون',
  'Address Information': 'معلومات العنوان',
  'Shipping Address': 'عنوان الشحن',
  'Payment and Shipping Method': 'طريقة الدفع والشحن',
  'Payment Method': 'طريقة الدفع او السداد',
  'Pay on Delivery': 'الدفع عند الاستلام',
  'Time Slot': 'فسحة زمنية',
  'Products': 'منتجات',
  'Items': 'العناصر',
  'Qty': 'الكمية',
  'Notes': 'ملاحظات',
  'Add Notes': 'إضافة ملاحظات',
  'Password': 'كلمه السر',
  'Username': 'اسم المستخدم',
  'Login': 'تسجيل الدخول',
  'Arabic': 'عربى',
  'Order List': 'لائحة الطلبات',
  'Add Note': 'اضف ملاحظة',
  'Processing': 'معالجة',
  'Delivered': 'تم التوصيل',
  'On Hold': 'في الانتظار',
  'Completed': 'منجز',
  'Cancel': 'إلغاء',
  'Save': 'حفظ',
  'Note': 'ملحوظة',
  'Add note': 'اضف ملاحظة',
  'Private': 'نشر',
  'Public': 'عامة',
  'Add': 'إضافة',
  'Note added.': 'ملاحظة المضافة.',
  'Please add your note.': 'يرجى إضافة ملاحظتك.',
  'Updated': 'محدث',
  'Invalid Credentials': 'بيانات الاعتماد غير صالحة',
  'Brand': 'علامة تجارية',
}

export const __ = (param, lang) => {

  if (lang == '' || typeof lang == 'undefined' || lang == 'undefined') {
    return param;
  }

  if (lang == 'ar')
    return language[param];
  else
    return param;
}