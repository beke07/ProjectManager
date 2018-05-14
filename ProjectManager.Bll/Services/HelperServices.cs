using System;
using System.Collections.Generic;
using System.Globalization;
using System.Text;

namespace ProjectManager.Bll.Services
{
    public class HelperServices
    {
        public static int GetWeekOfYear(DateTime time)
        {
            DayOfWeek day = CultureInfo.InvariantCulture.Calendar.GetDayOfWeek(time);
            if (day >= DayOfWeek.Monday && day <= DayOfWeek.Wednesday)
            {
                time = time.AddDays(3);
            }

            int weeks = CultureInfo.InvariantCulture.Calendar.GetWeekOfYear(time, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);

            int diff = time.Year - DateTime.Now.Year;
            if(diff > 0)
            {
                weeks += (diff * 52);
            }

            return weeks;
        }
    }
}
