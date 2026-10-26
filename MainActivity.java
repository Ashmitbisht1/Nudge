package com.nudge.reminders;

import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  private volatile String insets = "0,0,0,0,0";

  public class NudgeBridge {
    @JavascriptInterface
    public String insets() {
      return insets;
    }

    @JavascriptInterface
    public void lightBars(final boolean light) {
      runOnUiThread(new Runnable() {
        public void run() {
          Window w = getWindow();
          WindowInsetsControllerCompat c = WindowCompat.getInsetsController(w, w.getDecorView());
          c.setAppearanceLightStatusBars(light);
          c.setAppearanceLightNavigationBars(light);
        }
      });
    }
  }

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    final Window window = getWindow();
    WindowCompat.setDecorFitsSystemWindows(window, false);
    window.setStatusBarColor(Color.TRANSPARENT);
    window.setNavigationBarColor(Color.TRANSPARENT);
    if (Build.VERSION.SDK_INT >= 28) {
      WindowManager.LayoutParams lp = window.getAttributes();
      lp.layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES;
      window.setAttributes(lp);
    }
    if (Build.VERSION.SDK_INT >= 29) {
      window.setNavigationBarContrastEnforced(false);
    }
    final WebView web = getBridge().getWebView();
    web.addJavascriptInterface(new NudgeBridge(), "NudgeNative");
    final float d = getResources().getDisplayMetrics().density;
    View root = findViewById(android.R.id.content);
    ViewCompat.setOnApplyWindowInsetsListener(root, (v, wi) -> {
      Insets bars = wi.getInsets(WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout());
      Insets ime = wi.getInsets(WindowInsetsCompat.Type.ime());
      int kb = Math.max(0, ime.bottom - bars.bottom);
      insets = (bars.top / d) + "," + (bars.right / d) + "," + (bars.bottom / d) + "," + (bars.left / d) + "," + (kb / d);
      web.post(() -> web.evaluateJavascript("window.__ins&&window.__ins()", null));
      return WindowInsetsCompat.CONSUMED;
    });
  }
}
