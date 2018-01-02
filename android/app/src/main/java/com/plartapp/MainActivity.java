package com.plartapp;

import android.widget.LinearLayout;
import android.graphics.Color;
import android.widget.TextView;
import android.view.Gravity;
import android.util.TypedValue;
import com.reactnativenavigation.controllers.SplashActivity;
import com.imagepicker.permissions.OnImagePickerPermissionsCallback; // <- add this import
import com.facebook.react.modules.core.PermissionListener; // <- add this import

public class MainActivity extends SplashActivity implements OnImagePickerPermissionsCallback {
    private PermissionListener listener; // <- add this attribute

    // Copy from here

    @Override
    public void setPermissionListener(PermissionListener listener)
    {
        this.listener = listener;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults)
    {
        if (listener != null)
        {
            listener.onRequestPermissionsResult(requestCode, permissions, grantResults);
        }
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    @Override
    public LinearLayout createSplashLayout() {
        LinearLayout view = new LinearLayout(this);
//        ImageView imageView = new ImageView(this);
        TextView textView = new TextView(this);

        view.setBackgroundColor(Color.parseColor("#673AB7"));
        view.setGravity(Gravity.CENTER);

        textView.setTextColor(Color.parseColor("#FFFFFF"));
        textView.setText("Achambear");
        textView.setGravity(Gravity.CENTER);
        textView.setTextSize(TypedValue.COMPLEX_UNIT_DIP, 40);

        // hard code the width and the height of the logo
//        LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(400, 167);
//        layoutParams.gravity = Gravity.CENTER;
//        imageView.setLayoutParams(layoutParams);
//        imageView.setImageDrawable(ContextCompat.getDrawable(this.getApplicationContext(), R.drawable.logo_file));
//
//        view.addView(imageView);

        view.addView(textView);
        return view;
    }
}
