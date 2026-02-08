export interface Script {
    id: number;
    title: string;
    content: string;
    jiraTaskId: string;
    serviceName: string;
    // status رو اگر تو ریسپانس نداری فعلا ننویس
}

// ورودی برای ساخت اسکریپت (طبق کد جاوای شما)
export interface UpdateContentCmd {
    title: string;
    content: string;
    jiraTaskId: string;
    serviceName: string;
}